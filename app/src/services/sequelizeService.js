"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nconf_1 = __importDefault(require("nconf"));
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(nconf_1.default.get("Database:DB_DATABASE"), nconf_1.default.get("Database:DB_USER"), nconf_1.default.get("Database:DB_PASS"), {
    host: nconf_1.default.get("Database:DB_HOST"),
    port: nconf_1.default.get("Database:DB_PORT"),
    dialect: "postgres",
});
exports.default = sequelize;
