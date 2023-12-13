"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cartProvider_1 = require("@providers/cartProvider");
const status_1 = require("@models/status");
const connectProvider_1 = require("@providers/connectProvider");
const sequelize_1 = require("sequelize");
exports.default = (_express) => {
    const cartProvider = new cartProvider_1.CartProvider();
    const connectProvider = new connectProvider_1.ConnectProvider();
    return {
        /**
         * @openapi
         * tags:
         *   name: Cart
         *   description: Cart management
         */
        delete: {
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /cart/{id}/removeFromCart:
                 *   delete:
                 *     tags: [Cart]
                 *     description: Delete
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
                 *             $ref: "#/components/schemas/removeFromCart"
                 *     responses:
                 *       200:
                 *         description: Success
                 *     security:
                 *       - Bearer: []
                 */
                await removeFromCart(req, res);
            },
        },
    };
    async function removeFromCart(req, res) {
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
            const data = await connectProvider.bulkDelete({
                [sequelize_1.Op.and]: [
                    { cartId: req.params.id },
                    { productId: req.body.productIds },
                ],
            });
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
            res.sendError(error);
        }
    }
};
