"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductProvider = void 0;
const baseProvider_1 = __importDefault(require("./baseProvider"));
const connectProvider_1 = require("./connectProvider");
class ProductProvider extends baseProvider_1.default {
    connectProvider = new connectProvider_1.ConnectProvider();
    constructor(skipInitDb) {
        super("product", skipInitDb);
    }
    async addProducts(body) {
        const products = await this.bulkCreate(body);
        products.forEach(async (product) => {
            const categoryIds = body.find((data) => data.title == product.dataValues.title).categoryIds;
            if (categoryIds != null && categoryIds != undefined) {
                const addConnects = categoryIds.map((cateId) => ({
                    categoryId: cateId,
                    productId: product.dataValues.id,
                }));
                await this.connectProvider.bulkCreate(addConnects);
            }
        });
        return products;
    }
}
exports.ProductProvider = ProductProvider;
