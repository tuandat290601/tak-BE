"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartProvider_1 = require("@providers/cartProvider");
const sequelize_api_paginate_1 = require("sequelize-api-paginate");
const connect_1 = require("@models/connect");
const product_1 = require("@models/product");
const status_1 = require("@models/status");
const user_1 = require("@models/user");
const statusProvider_1 = require("@providers/statusProvider");
const auth_1 = __importDefault(require("@middlewares/auth"));
exports.default = (_express) => {
    const cartProvider = new cartProvider_1.CartProvider();
    const statusProvider = new statusProvider_1.StatusProvider();
    return {
        /**
         * @openapi
         * tags:
         *   name: Cart
         *   description: Cart management
         */
        get: {
            middleware: [sequelize_api_paginate_1.middle, auth_1.default],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /cart:
                 *   get:
                 *     tags: [Cart]
                 *     description: Get
                 *     parameters:
                 *       - $ref: "#/components/parameters/filters"
                 *       - $ref: "#/components/parameters/sortOrder"
                 *       - $ref: "#/components/parameters/sortField"
                 *       - $ref: "#/components/parameters/currentPage"
                 *       - $ref: "#/components/parameters/pageSize"
                 *     responses:
                 *       200:
                 *         description: Success
                 *
                 */
                await getAllCart(req, res);
            },
        },
        post: {
            middleware: auth_1.default,
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /cart:
                 *   post:
                 *     tags: [Cart]
                 *     description: Post
                 *     requestBody:
                 *       required: true
                 *       content:
                 *         application/json:
                 *          schema:
                 *            type: "array"
                 *            items:
                 *              $ref: "#/components/schemas/createCart"
                 *     responses:
                 *       200:
                 *         description: Success
                 *     security:
                 *       - Bearer: []
                 */
                await postBulkCart(req, res);
            },
        },
        delete: {
            middleware: [auth_1.default, sequelize_api_paginate_1.middle],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /cart:
                 *   delete:
                 *     tags: [Cart]
                 *     description: Delete
                 *     parameters:
                 *       - $ref: "#/components/parameters/filtersEdit"
                 *     responses:
                 *       200:
                 *         description: Success
                 *     security:
                 *       - Bearer: []
                 */
                await deleteBulkCart(req, res);
            },
        },
    };
    async function getAllCart(req, res) {
        try {
            const data = await cartProvider.getAllWithOptions(req.payload, [
                {
                    model: connect_1.connect,
                    as: "connects",
                    attributes: ["id", "productId"],
                    include: [
                        {
                            model: product_1.product,
                            as: "product",
                            attributes: [
                                "id",
                                "title",
                                "originPrice",
                                "discountPrice",
                                "type",
                            ],
                        },
                    ],
                },
                {
                    model: status_1.status,
                    as: "status",
                    attributes: ["id", "name", "code"],
                },
                {
                    model: user_1.user,
                    as: "createdByUser",
                    attributes: ["fullName", "email"],
                },
            ]);
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
        res.end();
    }
    async function postBulkCart(req, res) {
        try {
            const pendingId = (await statusProvider.getOne({ code: "PENDING" }))
                .dataValues.id;
            const body = {
                createdAt: new Date(),
                createdBy: req.user.id,
                statusId: pendingId,
            };
            const data = await cartProvider.bulkCreateCart(body, req.body);
            if (data == null || data.length == 0)
                throw new Error("There has been an error in adding cart");
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
    }
    async function deleteBulkCart(req, res) {
        try {
            const data = await cartProvider.bulkDelete(req.payload.filters);
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
    }
};
