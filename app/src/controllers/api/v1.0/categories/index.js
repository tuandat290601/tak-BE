"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryProvider_1 = require("@providers/categoryProvider");
const auth_1 = __importDefault(require("@middlewares/auth"));
const sequelize_api_paginate_1 = require("sequelize-api-paginate");
exports.default = (_express) => {
    const categoryProvider = new categoryProvider_1.CategoryProvider();
    return {
        /**
         * @openapi
         * tags:
         *   name: Categories
         *   description: Categories management
         */
        get: {
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /categories:
                 *   get:
                 *     tags: [Categories]
                 *     description: Get
                 *     responses:
                 *       200:
                 *         description: Success
                 */
                await getAllCategories(req, res);
            },
        },
        post: {
            middleware: auth_1.default,
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /categories:
                 *   post:
                 *     tags: [Categories]
                 *     description: Post
                 *     responses:
                 *       200:
                 *         description: Success
                 *     requestBody:
                 *       required: true
                 *       content:
                 *         application/json:
                 *          schema:
                 *            type: "array"
                 *            items:
                 *              $ref: "#/components/schemas/editCategory"
                 *     security:
                 *       - Bearer: []
                 */
                await postBulkCategories(req, res);
            },
        },
        put: {
            middleware: [sequelize_api_paginate_1.middle, auth_1.default],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /categories:
                 *   put:
                 *     tags: [Categories]
                 *     description: Put
                 *     responses:
                 *       200:
                 *         description: Success
                 *     parameters:
                 *       - $ref: "#/components/parameters/filtersEdit"
                 *     requestBody:
                 *       required: true
                 *       content:
                 *         application/json:
                 *          schema:
                 *            $ref: "#/components/schemas/editCategory"
                 *     security:
                 *       - Bearer: []
                 */
                await putBulkCategories(req, res);
            },
        },
        delete: {
            middleware: [auth_1.default, sequelize_api_paginate_1.middle],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /categories:
                 *   delete:
                 *     tags: [Categories]
                 *     description: Delete
                 *     parameters:
                 *       - $ref: "#/components/parameters/filtersEdit"
                 *     responses:
                 *       200:
                 *         description: Success
                 *     security:
                 *       - Bearer: []
                 *
                 */
                await deleteBulkCategories(req, res);
            },
        },
    };
    async function getAllCategories(req, res) {
        try {
            const data = await categoryProvider.getAll();
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
        res.end();
    }
    async function postBulkCategories(req, res) {
        try {
            req.body.forEach((data) => {
                data.createdAt = new Date();
                data.createdBy = req.user.id;
            });
            const data = await categoryProvider
                .bulkCreate(req.body)
                .catch((err) => {
                throw new Error(err.message);
            });
            if (data == null || data.length == 0)
                throw new Error("There has been an error in adding categories");
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
    }
    async function putBulkCategories(req, res) {
        try {
            const data = await categoryProvider
                .bulkUpdate(req.payload.filters, req.body)
                .catch((err) => console.log(err.message));
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
    }
    async function deleteBulkCategories(req, res) {
        try {
            const data = await categoryProvider.bulkDelete(req.payload.filters);
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
    }
};
