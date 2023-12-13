"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedback = void 0;
const sequelize_1 = require("sequelize");
class feedback extends sequelize_1.Model {
    id;
    content;
    createdAt;
    createdBy;
    updatedAt;
    updatedBy;
    rating;
    username;
    // feedback hasMany connect via feedbackId
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
    // feedback belongsTo user via createdBy
    createdByUser;
    getCreatedByUser;
    setCreatedByUser;
    createCreatedByUser;
    // feedback belongsTo user via updatedBy
    updatedByUser;
    getUpdatedByUser;
    setUpdatedByUser;
    createUpdatedByUser;
    static initModel(sequelize) {
        return feedback.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true
            },
            content: {
                type: sequelize_1.DataTypes.TEXT,
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
            rating: {
                type: sequelize_1.DataTypes.DECIMAL,
                allowNull: true
            },
            username: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'feedback',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "feedback_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.feedback = feedback;
