"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bannerProvider_1 = require("@providers/bannerProvider");
const auth_1 = __importDefault(require("@middlewares/auth"));
const sequelize_api_paginate_1 = require("sequelize-api-paginate");
exports.default = (_express) => {
    const bannerProvider = new bannerProvider_1.BannerProvider();
    return {
        /**
         * @openapi
         * tags:
         *   name: Banners
         *   description: Banners management
         */
        get: {
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /banners:
                 *   get:
                 *     tags: [Banners]
                 *     description: Get
                 *     responses:
                 *       200:
                 *         description: Success
                 */
                await getAllBanners(req, res);
            },
        },
        post: {
            middleware: auth_1.default,
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /banners:
                 *   post:
                 *     tags: [Banners]
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
                 *              $ref: "#/components/schemas/editBanner"
                 *     security:
                 *       - Bearer: []
                 */
                await postBulkBanners(req, res);
            },
        },
        put: {
            middleware: [sequelize_api_paginate_1.middle, auth_1.default],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /banners:
                 *   put:
                 *     tags: [Banners]
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
                 *            $ref: "#/components/schemas/editBanner"
                 *     security:
                 *       - Bearer: []
                 */
                await putBulkBanners(req, res);
            },
        },
        delete: {
            middleware: [auth_1.default, sequelize_api_paginate_1.middle],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /banners:
                 *   delete:
                 *     tags: [Banners]
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
                await deleteBulkBanners(req, res);
            },
        },
    };
    async function getAllBanners(req, res) {
        try {
            const data = await bannerProvider.getAll();
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
        res.end();
    }
    async function postBulkBanners(req, res) {
        try {
            req.body.forEach((data) => {
                data.createdAt = new Date();
                data.createdBy = req.user.id;
            });
            const data = await bannerProvider
                .bulkCreate(req.body)
                .catch((err) => {
                throw new Error(err.message);
            });
            if (data == null || data.length == 0)
                throw new Error("There has been an error in adding banners");
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
    }
    async function putBulkBanners(req, res) {
        try {
            const data = await bannerProvider
                .bulkUpdate(req.payload.filters, req.body)
                .catch((err) => console.log(err.message));
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
    }
    async function deleteBulkBanners(req, res) {
        try {
            const data = await bannerProvider.bulkDelete(req.payload.filters);
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
    }
};
