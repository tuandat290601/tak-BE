"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = void 0;
const sequelize_1 = require("sequelize");
class status extends sequelize_1.Model {
    id;
    code;
    groupCode;
    name;
    // status hasMany cart via statusId
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
    static initModel(sequelize) {
        return status.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
                primaryKey: true
            },
            code: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            },
            groupCode: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
                field: 'group_code'
            },
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'status',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "status_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.status = status;
