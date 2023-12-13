"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const sequelize_1 = require("sequelize");
class user extends sequelize_1.Model {
    id;
    email;
    fullName;
    password;
    createdAt;
    createdBy;
    updatedAt;
    updatedBy;
    avatar;
    // user hasMany banner via createdBy
    banners;
    getBanners;
    setBanners;
    addBanner;
    addBanners;
    createBanner;
    removeBanner;
    removeBanners;
    hasBanner;
    hasBanners;
    countBanners;
    // user hasMany banner via updatedBy
    updatedByBanners;
    getUpdatedByBanners;
    setUpdatedByBanners;
    addUpdatedByBanner;
    addUpdatedByBanners;
    createUpdatedByBanner;
    removeUpdatedByBanner;
    removeUpdatedByBanners;
    hasUpdatedByBanner;
    hasUpdatedByBanners;
    countUpdatedByBanners;
    // user hasMany cart via createdBy
    carts;
    getCarts;
    setCarts;
    addCart;
    addCarts;
    createCart;
    removeCart;
    removeCarts;
    hasCart;
    hasCarts;
    countCarts;
    // user hasMany cart via updatedBy
    updatedByCarts;
    getUpdatedByCarts;
    setUpdatedByCarts;
    addUpdatedByCart;
    addUpdatedByCarts;
    createUpdatedByCart;
    removeUpdatedByCart;
    removeUpdatedByCarts;
    hasUpdatedByCart;
    hasUpdatedByCarts;
    countUpdatedByCarts;
    // user hasMany category via createdBy
    categories;
    getCategories;
    setCategories;
    addCategory;
    addCategories;
    createCategory;
    removeCategory;
    removeCategories;
    hasCategory;
    hasCategories;
    countCategories;
    // user hasMany feedback via createdBy
    feedbacks;
    getFeedbacks;
    setFeedbacks;
    addFeedback;
    addFeedbacks;
    createFeedback;
    removeFeedback;
    removeFeedbacks;
    hasFeedback;
    hasFeedbacks;
    countFeedbacks;
    // user hasMany feedback via updatedBy
    updatedByFeedbacks;
    getUpdatedByFeedbacks;
    setUpdatedByFeedbacks;
    addUpdatedByFeedback;
    addUpdatedByFeedbacks;
    createUpdatedByFeedback;
    removeUpdatedByFeedback;
    removeUpdatedByFeedbacks;
    hasUpdatedByFeedback;
    hasUpdatedByFeedbacks;
    countUpdatedByFeedbacks;
    // user hasMany product via createdBy
    products;
    getProducts;
    setProducts;
    addProduct;
    addProducts;
    createProduct;
    removeProduct;
    removeProducts;
    hasProduct;
    hasProducts;
    countProducts;
    // user hasMany product via updatedBy
    updatedByProducts;
    getUpdatedByProducts;
    setUpdatedByProducts;
    addUpdatedByProduct;
    addUpdatedByProducts;
    createUpdatedByProduct;
    removeUpdatedByProduct;
    removeUpdatedByProducts;
    hasUpdatedByProduct;
    hasUpdatedByProducts;
    countUpdatedByProducts;
    // user belongsTo user via createdBy
    createdByUser;
    getCreatedByUser;
    setCreatedByUser;
    createCreatedByUser;
    // user belongsTo user via updatedBy
    updatedByUser;
    getUpdatedByUser;
    setUpdatedByUser;
    createUpdatedByUser;
    static initModel(sequelize) {
        return user.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            fullName: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
                field: 'full_name'
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                field: 'created_at'
            },
            createdBy: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'user',
                    key: 'id'
                },
                field: 'created_by'
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                field: 'updated_at'
            },
            updatedBy: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'user',
                    key: 'id'
                },
                field: 'updated_by'
            },
            avatar: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'user',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "user_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.user = user;
