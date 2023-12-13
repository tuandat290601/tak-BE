"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartProvider = void 0;
const baseProvider_1 = __importDefault(require("./baseProvider"));
const connectProvider_1 = require("./connectProvider");
class CartProvider extends baseProvider_1.default {
    connectProvider;
    constructor(skipInitDb) {
        super("cart", skipInitDb);
        this.connectProvider = new connectProvider_1.ConnectProvider();
    }
    async bulkCreateCart(body, items) {
        const cartConnectItem = items.map(({ itemId, itemAmount }) => ({
            productId: itemId,
            amount: itemAmount,
        }));
        return await this.post(body).then(async (response) => {
            const connectCart = cartConnectItem.map((item) => ({
                cartId: response.dataValues.id,
                ...item,
            }));
            return await this.connectProvider
                .bulkCreate(connectCart)
                .then((connected) => ({
                ...response.dataValues,
                items: connected.map((item) => item.dataValues),
            }));
        });
    }
    async addToCart(id, body) {
        const cartConnect = body.map((item) => ({
            cartId: id,
            productId: item.itemId,
            amount: item.itemAmount,
        }));
        return await this.connectProvider.bulkCreate(cartConnect);
    }
}
exports.CartProvider = CartProvider;
