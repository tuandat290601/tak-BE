"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productProvider_1 = require("@providers/productProvider");
const sequelize_api_paginate_1 = require("sequelize-api-paginate");
const category_1 = require("@models/category");
const connect_1 = require("@models/connect");
const feedback_1 = require("@models/feedback");
const product_1 = require("@models/product");
const connectProvider_1 = require("@providers/connectProvider");
const sequelize_1 = require("sequelize");
const auth_1 = __importDefault(require("@middlewares/auth"));
exports.default = (_express) => {
    const productProvider = new productProvider_1.ProductProvider();
    const connectProvider = new connectProvider_1.ConnectProvider();
    return {
        /**
         * @openapi
         * tags:
         *   name: Products
         *   description: Products management
         */
        get: {
            middleware: [sequelize_api_paginate_1.middle],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /products:
                 *   get:
                 *     tags: [Products]
                 *     description: Get
                 *     parameters:
                 *       - $ref: "#/components/parameters/filters"
                 *       - $ref: "#/components/parameters/sortOrder"
                 *       - $ref: "#/components/parameters/sortField"
                 *       - $ref: "#/components/parameters/currentPage"
                 *       - $ref: "#/components/parameters/pageSize"
                 *       - $ref: "#/components/parameters/categoryListIds"
                 *     responses:
                 *       200:
                 *         description: Success
                 *
                 */
                await getAllProducts(req, res);
            },
        },
        post: {
            middleware: auth_1.default,
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /products:
                 *   post:
                 *     tags: [Products]
                 *     description: Post
                 *     requestBody:
                 *       required: true
                 *       content:
                 *         application/json:
                 *          schema:
                 *            type: "array"
                 *            items:
                 *              $ref: "#/components/schemas/editProduct"
                 *     responses:
                 *       200:
                 *         description: Success
                 *     security:
                 *       - Bearer: []
                 */
                await postBulkProducts(req, res);
            },
        },
        put: {
            middleware: [auth_1.default, sequelize_api_paginate_1.middle],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /products:
                 *   put:
                 *     tags: [Products]
                 *     description: Put
                 *     parameters:
                 *       - $ref: "#/components/parameters/filtersEdit"
                 *     requestBody:
                 *       required: true
                 *       content:
                 *         application/json:
                 *          schema:
                 *              $ref: "#/components/schemas/editProduct"
                 *     responses:
                 *       200:
                 *         description: Success
                 *     security:
                 *       - Bearer: []
                 */
                await putBulkProducts(req, res);
            },
        },
        delete: {
            middleware: [auth_1.default, sequelize_api_paginate_1.middle],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /products:
                 *   delete:
                 *     tags: [Products]
                 *     description: Delete
                 *     parameters:
                 *       - $ref: "#/components/parameters/filtersEdit"
                 *     responses:
                 *       200:
                 *         description: Success
                 *     security:
                 *       - Bearer: []
                 */
                await deleteBulkProducts(req, res);
            },
        },
    };
    async function getAllProducts(req, res) {
        try {
            const payload = {
                ...req.payload,
            };
            payload.filters[sequelize_1.Op.and] ??= [];
            payload.filters[sequelize_1.Op.and].unshift({ isActive: true });
            if (req.query.categoryListIds) {
                const subCateList = req.query.categoryListIds.split(",");
                const arrProductId = await connectProvider
                    .getAll({
                    categoryId: subCateList,
                }, null, ["productId", (0, sequelize_1.fn)("COUNT", (0, sequelize_1.col)("*"))], ["product_id"])
                    .then((res) => {
                    return res.count
                        .filter(({ count }) => count == subCateList.length)
                        .map(({ product_id }) => ({ productId: product_id }));
                });
                payload.filters[sequelize_1.Op.and].push({
                    id: arrProductId.map((x) => x.productId),
                });
            }
            const data = await productProvider.getAllWithOptions(payload, [
                {
                    model: connect_1.connect,
                    as: "connects",
                    attributes: ["id", "feedbackId", "categoryId"],
                    include: [
                        {
                            model: category_1.category,
                            as: "category",
                            attributes: ["title", "image", "parentId"],
                        },
                        {
                            model: feedback_1.feedback,
                            as: "feedback",
                            attributes: [
                                "username",
                                "content",
                                "rating",
                                "createdAt",
                                "createdBy",
                            ],
                        },
                    ],
                },
            ], false, false, true, true);
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
        res.end();
    }
    async function postBulkProducts(req, res) {
        try {
            const data = await productProvider.addProducts(req.body.map((data) => ({
                ...data,
                discountPercent: data.discountPrice
                    ? ((data.originPrice - data.discountPrice) / data.originPrice) *
                        100
                    : 0,
                createdAt: new Date(),
                createdBy: req.user.id,
            })));
            if (data == null || data.length == 0)
                throw new Error("There has been an error in adding product");
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
    }
    async function putBulkProducts(req, res) {
        try {
            const { categoryIds, ...body } = req.body;
            const data = await productProvider.bulkUpdate(req.payload.filters, body);
            if (categoryIds != undefined) {
                const connects = await connectProvider
                    .getAll({ categoryId: { [sequelize_1.Op.not]: null } }, [
                    {
                        model: product_1.product,
                        as: "product",
                        attributes: ["id"],
                        where: req.payload.filters,
                    },
                ])
                    .then(({ rows }) => rows);
                const products = connects.length == 0
                    ? // No prior categories => add new
                        await productProvider
                            .getAll(req.payload.filters, null, ["id"])
                            .then(({ rows }) => rows.reduce((acc, { dataValues }) => ((acc[dataValues.id] ??= []), acc), {}))
                    : // Has prior connects
                        connects.reduce((acc, val) => (acc[val.dataValues.productId]
                            ? acc[val.dataValues.productId].push(val)
                            : (acc[val.dataValues.productId] = [val]),
                            acc), {});
                for (var [key, values] of Object.entries(products)) {
                    values.forEach(async (connect) => {
                        const index = categoryIds.indexOf(connect.dataValues.categoryId);
                        if (index == -1)
                            await connect.destroy();
                        else
                            categoryIds.splice(index, 1);
                    });
                    if (categoryIds.length > 0) {
                        const addConnects = categoryIds.map((id) => ({
                            productId: key,
                            categoryId: id,
                        }));
                        await connectProvider.bulkCreate(addConnects);
                    }
                }
            }
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
    }
    async function deleteBulkProducts(req, res) {
        try {
            const data = await productProvider.bulkUpdate(req.payload.filters, {
                isActive: false,
            });
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
    }
};
