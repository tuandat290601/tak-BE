"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userProvider_1 = require("@providers/userProvider");
const sequelize_api_paginate_1 = require("sequelize-api-paginate");
const auth_1 = __importDefault(require("@middlewares/auth"));
exports.default = (_express) => {
    const userProvider = new userProvider_1.UserProvider();
    return {
        /**
         * @openapi
         * tags:
         *   name: Users
         *   description: User management and login
         */
        get: {
            middleware: [auth_1.default, sequelize_api_paginate_1.middle],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /users:
                 *   get:
                 *     tags: [Users]
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
                 *     security:
                 *       - Bearer: []
                 */
                await getAllUsers(req, res);
            },
        },
        post: {
            middleware: auth_1.default,
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /users:
                 *   post:
                 *     tags: [Users]
                 *     description: Post
                 *     responses:
                 *       200:
                 *         description: Success
                 *     security:
                 *       - Bearer: []
                 */
                await postBulkUsers(req, res);
            },
        },
    };
    async function getAllUsers(req, res) {
        try {
            const data = await userProvider.getAllWithOptions(req.payload, []);
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
        res.end();
    }
    async function postBulkUsers(req, res) {
        try {
            const data = await userProvider.bulkCreate(req.body);
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
    }
};
