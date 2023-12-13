"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.category = void 0;
const sequelize_1 = require("sequelize");
class category extends sequelize_1.Model {
    id;
    title;
    image;
    parentId;
    createdAt;
    createdBy;
    updatedAt;
    updatedBy;
    // category belongsTo category via parentId
    parent;
    getParent;
    setParent;
    createParent;
    // category hasMany connect via categoryId
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
    // category belongsTo user via createdBy
    createdByUser;
    getCreatedByUser;
    setCreatedByUser;
    createCreatedByUser;
    static initModel(sequelize) {
        return category.init({
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
            image: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            parentId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'category',
                    key: 'id'
                },
                field: 'parent_id'
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
                field: 'updated_by'
            }
        }, {
            sequelize,
            tableName: 'category',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "category_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.category = category;
