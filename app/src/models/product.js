"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const sequelize_1 = require("sequelize");
class product extends sequelize_1.Model {
    id;
    title;
    originPrice;
    discountPrice;
    rating;
    image;
    description;
    detail;
    sku;
    attributes;
    createdAt;
    createdBy;
    updatedAt;
    updatedBy;
    sold;
    isActive;
    display;
    type;
    discountPercent;
    region;
    meta;
    // product hasMany connect via productId
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
    // product belongsTo user via createdBy
    createdByUser;
    getCreatedByUser;
    setCreatedByUser;
    createCreatedByUser;
    // product belongsTo user via updatedBy
    updatedByUser;
    getUpdatedByUser;
    setUpdatedByUser;
    createUpdatedByUser;
    static initModel(sequelize) {
        return product.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true
            },
            title: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            originPrice: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: true,
                field: 'origin_price'
            },
            discountPrice: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: true,
                defaultValue: 0,
                field: 'discount_price'
            },
            rating: {
                type: sequelize_1.DataTypes.SMALLINT,
                allowNull: true
            },
            image: {
                type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
                allowNull: true
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            detail: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true
            },
            sku: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            attributes: {
                type: sequelize_1.DataTypes.JSON,
                allowNull: true
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
            sold: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0
            },
            isActive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true,
                field: 'is_active'
            },
            display: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
            type: {
                type: sequelize_1.DataTypes.STRING(10),
                allowNull: false,
                defaultValue: "PRODUCT",
                comment: "PRODUCT | COURSE | SERVICE"
            },
            discountPercent: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: true,
                field: 'discount_percent'
            },
            region: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
                comment: "ASIA | OCE | EU | US | LATAM | AFRICA"
            },
            meta: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'product',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "product_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.product = product;
