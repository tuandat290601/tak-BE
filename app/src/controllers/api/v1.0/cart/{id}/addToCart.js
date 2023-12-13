"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartProvider_1 = require("@providers/cartProvider");
const auth_1 = __importDefault(require("@middlewares/auth"));
const status_1 = require("@models/status");
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
                 * /cart/{id}/addToCart:
                 *   put:
                 *     tags: [Cart]
                 *     description: Post
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
                 *            type: "array"
                 *            items:
                 *              $ref: "#/components/schemas/createCart"
                 *     responses:
                 *       200:
                 *         description: Success
                 *     security:
                 *       - Bearer: []
                 */
                await addToCart(req, res);
            },
        },
    };
    async function addToCart(req, res) {
        try {
            const cart = await cartProvider.getById(req.params.id, null, [
                {
                    model: status_1.status,
                    as: "status",
                },
            ]);
            if (cart == null)
                throw new Error("Cart not found");
            const statusIncl = JSON.parse(JSON.stringify(cart)).status;
            if (statusIncl.code === "COMPLETED")
                throw new Error("Cart has already completed");
            const data = await cartProvider.addToCart(req.params.id, req.body);
            cart
                .update({
                updatedAt: new Date(),
                updatedBy: req.user.id,
            })
                .catch((err) => {
                console.log(err);
            });
            res.sendOk(data);
        }
        catch (error) {
            console.log(error);
            res.sendError(error);
        }
    }
};
