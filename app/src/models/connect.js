"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const sequelize_1 = require("sequelize");
class connect extends sequelize_1.Model {
    id;
    productId;
    feedbackId;
    cartId;
    amount;
    categoryId;
    // connect belongsTo cart via cartId
    cart;
    getCart;
    setCart;
    createCart;
    // connect belongsTo category via categoryId
    category;
    getCategory;
    setCategory;
    createCategory;
    // connect belongsTo feedback via feedbackId
    feedback;
    getFeedback;
    setFeedback;
    createFeedback;
    // connect belongsTo product via productId
    product;
    getProduct;
    setProduct;
    createProduct;
    static initModel(sequelize) {
        return connect.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true
            },
            productId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'product',
                    key: 'id'
                },
                field: 'product_id'
            },
            feedbackId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'feedback',
                    key: 'id'
                },
                field: 'feedback_id'
            },
            cartId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'cart',
                    key: 'id'
                },
                field: 'cart_id'
            },
            amount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 1
            },
            categoryId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'category',
                    key: 'id'
                },
                field: 'category_id'
            }
        }, {
            sequelize,
            tableName: 'connect',
            schema: 'public',
            hasTrigger: true,
            timestamps: false,
            indexes: [
                {
                    name: "connect_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.connect = connect;
