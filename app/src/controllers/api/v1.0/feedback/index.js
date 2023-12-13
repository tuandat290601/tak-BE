"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const feedbackProvider_1 = require("@providers/feedbackProvider");
const sequelize_api_paginate_1 = require("sequelize-api-paginate");
const auth_1 = __importDefault(require("@middlewares/auth"));
const connectProvider_1 = require("@providers/connectProvider");
const sequelize_1 = require("sequelize");
const product_1 = require("@models/product");
const connect_1 = require("@models/connect");
const user_1 = require("@models/user");
exports.default = (_express) => {
    const feedbackProvider = new feedbackProvider_1.FeedbackProvider();
    const connectProvider = new connectProvider_1.ConnectProvider();
    return {
        /**
         * @openapi
         * tags:
         *   name: Feedback
         *   description: Feedback management
         */
        get: {
            middleware: [sequelize_api_paginate_1.middle],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /feedback:
                 *   get:
                 *     tags: [Feedback]
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
                await getAllFeedback(req, res);
            },
        },
        post: {
            middleware: [auth_1.default],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /feedback:
                 *   post:
                 *     tags: [Feedback]
                 *     description: Post
                 *     requestBody:
                 *       required: true
                 *       content:
                 *         application/json:
                 *          schema:
                 *            type: "array"
                 *            items:
                 *              $ref: "#/components/schemas/addFeedback"
                 *     responses:
                 *       200:
                 *         description: Success
                 *     security:
                 *       - Bearer: []
                 */
                await postBulkFeedback(req, res);
            },
        },
        put: {
            middleware: [auth_1.default, sequelize_api_paginate_1.middle],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /feedback:
                 *   put:
                 *     tags: [Feedback]
                 *     description: Put
                 *     parameters:
                 *       - $ref: "#/components/parameters/filtersEdit"
                 *     requestBody:
                 *       required: true
                 *       content:
                 *         application/json:
                 *          schema:
                 *              $ref: "#/components/schemas/editFeedback"
                 *     responses:
                 *       200:
                 *         description: Success
                 *     security:
                 *       - Bearer: []
                 */
                await putBulkFeedback(req, res);
            },
        },
        delete: {
            middleware: [auth_1.default],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /feedback:
                 *   delete:
                 *     tags: [Feedback]
                 *     description: Delete
                 *     parameters:
                 *       - id:
                 *         name: id
                 *         in: query
                 *         type: string
                 *         required: true
                 *         example: id1,id2
                 *     responses:
                 *       200:
                 *         description: Success
                 *     security:
                 *       - Bearer: []
                 */
                await deleteBulkFeedback(req, res);
            },
        },
    };
    async function getAllFeedback(req, res) {
        try {
            const data = await feedbackProvider.getAllWithOptions(req.payload, [
                {
                    model: connect_1.connect,
                    as: "connects",
                    attributes: ["id", "productId", "courseId"],
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
                    model: user_1.user,
                    as: "createdByUser",
                    attributes: ["id", "fullName", "avatar"],
                },
            ], false, false, true, true, false);
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
        res.end();
    }
    async function postBulkFeedback(req, res) {
        try {
            const body = req.body.map((item) => ({
                ...item,
                createdAt: new Date(),
                createdBy: req.user.id,
            })), data = await feedbackProvider.bulkCreateFeedback(body);
            if (data == null || data.length == 0)
                throw new Error("There has been an error in adding product");
            return res.sendOk(data);
        }
        catch (error) {
            return res.sendError(error);
        }
    }
    async function putBulkFeedback(req, res) {
        try {
            const data = await feedbackProvider.bulkUpdate(req.payload.filters, req.body);
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
    }
    async function deleteBulkFeedback(req, res) {
        try {
            const ids = req.query.id.split(",");
            await connectProvider.bulkDelete({
                feedbackId: { [sequelize_1.Op.in]: ids },
            });
            const data = await feedbackProvider.bulkDelete({
                id: { [sequelize_1.Op.in]: ids },
            });
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
    }
};
