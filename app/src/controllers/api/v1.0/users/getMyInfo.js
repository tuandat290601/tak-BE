"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("@middlewares/auth"));
const userProvider_1 = require("@providers/userProvider");
const cart_1 = require("@models/cart");
const connect_1 = require("@models/connect");
const product_1 = require("@models/product");
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
            middleware: auth_1.default,
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /users/getMyInfo:
                 *   get:
                 *     tags: [Users]
                 *     description: Get
                 *     responses:
                 *       200:
                 *         description: Success
                 *     security:
                 *       - Bearer: []
                 */
                await getMyInfo(req, res);
            },
        },
    };
    async function getMyInfo(req, res) {
        try {
            const data = await userProvider.getById(req.user.id, ["id", "email", "fullName"], [
                {
                    model: cart_1.cart,
                    as: "carts",
                    attributes: ["id", "createdAt", "updatedAt"],
                    include: [
                        {
                            model: connect_1.connect,
                            as: "connects",
                            attributes: ["id", "productId", "courseId"],
                            include: [
                                {
                                    model: product_1.product,
                                    as: "product",
                                    attributes: ["id", "title", "originPrice", "discountPrice", "type"],
                                },
                            ],
                        },
                    ],
                },
            ]);
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
        res.end();
    }
};
