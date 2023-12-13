"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.banner = void 0;
const sequelize_1 = require("sequelize");
class banner extends sequelize_1.Model {
    id;
    image;
    sortOrder;
    createdAt;
    createdBy;
    updatedAt;
    updatedBy;
    // banner belongsTo user via createdBy
    createdByUser;
    getCreatedByUser;
    setCreatedByUser;
    createCreatedByUser;
    // banner belongsTo user via updatedBy
    updatedByUser;
    getUpdatedByUser;
    setUpdatedByUser;
    createUpdatedByUser;
    static initModel(sequelize) {
        return banner.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true
            },
            image: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            sortOrder: {
                type: sequelize_1.DataTypes.SMALLINT,
                allowNull: true,
                defaultValue: 0,
                field: 'sort_order'
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
            }
        }, {
            sequelize,
            tableName: 'banner',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "banner_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.banner = banner;
