"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cart = void 0;
const sequelize_1 = require("sequelize");
class cart extends sequelize_1.Model {
    id;
    createdAt;
    createdBy;
    updatedAt;
    updatedBy;
    statusId;
    cartPrice;
    // cart hasMany connect via cartId
    connects;
    getConnects;
    setConnects;
    addConnect;
    addConnects;
    createConnect;
    removeConnect;
    removeConnects;
    hasConnect;
    hasConnects;
    countConnects;
    // cart belongsTo status via statusId
    status;
    getStatus;
    setStatus;
    createStatus;
    // cart belongsTo user via createdBy
    createdByUser;
    getCreatedByUser;
    setCreatedByUser;
    createCreatedByUser;
    // cart belongsTo user via updatedBy
    updatedByUser;
    getUpdatedByUser;
    setUpdatedByUser;
    createUpdatedByUser;
    static initModel(sequelize) {
        return cart.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true
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
            statusId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'status',
                    key: 'id'
                },
                field: 'status_id'
            },
            cartPrice: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: true,
                field: 'cart_price'
            }
        }, {
            sequelize,
            tableName: 'cart',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "cart_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.cart = cart;
