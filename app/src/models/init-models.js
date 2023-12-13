"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.user = exports.status = exports.product = exports.feedback = exports.connect = exports.category = exports.cart = exports.banner = void 0;
const banner_1 = require("./banner");
Object.defineProperty(exports, "banner", { enumerable: true, get: function () { return banner_1.banner; } });
const cart_1 = require("./cart");
Object.defineProperty(exports, "cart", { enumerable: true, get: function () { return cart_1.cart; } });
const category_1 = require("./category");
Object.defineProperty(exports, "category", { enumerable: true, get: function () { return category_1.category; } });
const connect_1 = require("./connect");
Object.defineProperty(exports, "connect", { enumerable: true, get: function () { return connect_1.connect; } });
const feedback_1 = require("./feedback");
Object.defineProperty(exports, "feedback", { enumerable: true, get: function () { return feedback_1.feedback; } });
const product_1 = require("./product");
Object.defineProperty(exports, "product", { enumerable: true, get: function () { return product_1.product; } });
const status_1 = require("./status");
Object.defineProperty(exports, "status", { enumerable: true, get: function () { return status_1.status; } });
const user_1 = require("./user");
Object.defineProperty(exports, "user", { enumerable: true, get: function () { return user_1.user; } });
function initModels(sequelize) {
    const banner = banner_1.banner.initModel(sequelize);
    const cart = cart_1.cart.initModel(sequelize);
    const category = category_1.category.initModel(sequelize);
    const connect = connect_1.connect.initModel(sequelize);
    const feedback = feedback_1.feedback.initModel(sequelize);
    const product = product_1.product.initModel(sequelize);
    const status = status_1.status.initModel(sequelize);
    const user = user_1.user.initModel(sequelize);
    connect.belongsTo(cart, { as: "cart", foreignKey: "cartId" });
    cart.hasMany(connect, { as: "connects", foreignKey: "cartId" });
    category.belongsTo(category, { as: "parent", foreignKey: "parentId" });
    category.hasMany(category, { as: "categories", foreignKey: "parentId" });
    connect.belongsTo(category, { as: "category", foreignKey: "categoryId" });
    category.hasMany(connect, { as: "connects", foreignKey: "categoryId" });
    connect.belongsTo(feedback, { as: "feedback", foreignKey: "feedbackId" });
    feedback.hasMany(connect, { as: "connects", foreignKey: "feedbackId" });
    connect.belongsTo(product, { as: "product", foreignKey: "productId" });
    product.hasMany(connect, { as: "connects", foreignKey: "productId" });
    cart.belongsTo(status, { as: "status", foreignKey: "statusId" });
    status.hasMany(cart, { as: "carts", foreignKey: "statusId" });
    banner.belongsTo(user, { as: "createdByUser", foreignKey: "createdBy" });
    user.hasMany(banner, { as: "banners", foreignKey: "createdBy" });
    banner.belongsTo(user, { as: "updatedByUser", foreignKey: "updatedBy" });
    user.hasMany(banner, { as: "updatedByBanners", foreignKey: "updatedBy" });
    cart.belongsTo(user, { as: "createdByUser", foreignKey: "createdBy" });
    user.hasMany(cart, { as: "carts", foreignKey: "createdBy" });
    cart.belongsTo(user, { as: "updatedByUser", foreignKey: "updatedBy" });
    user.hasMany(cart, { as: "updatedByCarts", foreignKey: "updatedBy" });
    category.belongsTo(user, { as: "createdByUser", foreignKey: "createdBy" });
    user.hasMany(category, { as: "categories", foreignKey: "createdBy" });
    feedback.belongsTo(user, { as: "createdByUser", foreignKey: "createdBy" });
    user.hasMany(feedback, { as: "feedbacks", foreignKey: "createdBy" });
    feedback.belongsTo(user, { as: "updatedByUser", foreignKey: "updatedBy" });
    user.hasMany(feedback, { as: "updatedByFeedbacks", foreignKey: "updatedBy" });
    product.belongsTo(user, { as: "createdByUser", foreignKey: "createdBy" });
    user.hasMany(product, { as: "products", foreignKey: "createdBy" });
    product.belongsTo(user, { as: "updatedByUser", foreignKey: "updatedBy" });
    user.hasMany(product, { as: "updatedByProducts", foreignKey: "updatedBy" });
    user.belongsTo(user, { as: "createdByUser", foreignKey: "createdBy" });
    user.hasMany(user, { as: "users", foreignKey: "createdBy" });
    user.belongsTo(user, { as: "updatedByUser", foreignKey: "updatedBy" });
    user.hasMany(user, { as: "updatedByUsers", foreignKey: "updatedBy" });
    return {
        banner: banner,
        cart: cart,
        category: category,
        connect: connect,
        feedback: feedback,
        product: product,
        status: status,
        user: user,
    };
}
exports.initModels = initModels;
