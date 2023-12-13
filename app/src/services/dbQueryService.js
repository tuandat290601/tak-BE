"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_models_1 = require("../models/init-models");
const sequelizeService_1 = __importDefault(require("./sequelizeService"));
const initExport = (0, init_models_1.initModels)(sequelizeService_1.default);
exports.default = initExport;
