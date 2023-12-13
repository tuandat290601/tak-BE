"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartProvider_1 = require("@providers/cartProvider");
const auth_1 = __importDefault(require("@middlewares/auth"));
exports.default = (_express) => {
    const cartProvider = new cartProvider_1.CartProvider();
    return {
        /**
         * @openapi
         * tags:
         *   name: Cart
         *   description: Cart management
         */
        put: {
            middleware: [auth_1.default],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /cart/{id}:
                 *   put:
                 *     tags: [Cart]
                 *     description: Put
                 *     parameters:
                 *        - in: path
                 *          name: id
                 *          required: true
                 *          type: string
                 *     requestBody:
                 *       required: true
                 *       content:
                 *         application/json:
                 *          schema:
                 *              $ref: "#/components/schemas/editCart"
                 *     responses:
                 *       200:
                 *         description: Success
                 *     security:
                 *       - Bearer: []
                 */
                await updateCart(req, res);
            },
        },
    };
    async function updateCart(req, res) {
        try {
            const body = {
                ...req.body,
                updatedAt: new Date(),
                updatedBy: req.user.id,
            };
            const data = await cartProvider.put(req.params.id, body);
            res.sendOk(data);
        }
        catch (error) {
            res.sendError(error);
        }
    }
};
