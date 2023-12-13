"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const statusProvider_1 = require("@providers/statusProvider");
const sequelize_api_paginate_1 = require("sequelize-api-paginate");
exports.default = (_express) => {
    const statusProvider = new statusProvider_1.StatusProvider();
    return {
        /**
         * @openapi
         * tags:
         *   name: Status
         *   description: status management
         */
        get: {
            middleware: [sequelize_api_paginate_1.middle],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /status:
                 *   get:
                 *     tags: [status]
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
                await getAllstatus(req, res);
            },
        },
    };
    async function getAllstatus(req, res) {
        try {
            const data = await statusProvider.getAllWithOptions(req.payload);
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
        res.end();
    }
};
