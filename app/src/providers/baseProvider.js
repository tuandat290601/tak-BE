"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbQueryService_1 = __importDefault(require("../services/dbQueryService"));
const sequelize_api_paginate_1 = require("sequelize-api-paginate");
class BaseProvider {
    db;
    key;
    model;
    constructor(key, skipInitDb) {
        this.key = key;
        this.db = skipInitDb ? {} : dbQueryService_1.default;
        this.model = this.db[this.key];
    }
    async getAll(where = null, include = null, attributes = null, group = null) {
        const payload = {};
        if (where != null)
            payload.where = where;
        if (include != null)
            payload.include = include;
        if (attributes != null)
            payload.attributes = attributes;
        if (group != null)
            payload.group = group;
        return await this.model.findAndCountAll(payload).catch((err) => {
            throw new Error(err.message);
        });
    }
    async getAllWithOptions(payload, includeModels = [], isHierarchy = false, raw = true, nest = true, distinct = false, subQuery = null) {
        return await (0, sequelize_api_paginate_1.query)(this.model, payload, includeModels, isHierarchy, raw, nest, distinct, subQuery).catch((err) => {
            throw new Error(err.message);
        });
    }
    async getById(id, includeAttributes = Object.keys(this.model.getAttributes()), includeModels = []) {
        includeAttributes =
            includeAttributes == null
                ? Object.keys(this.model.getAttributes())
                : includeAttributes;
        return await this.model
            .findByPk(id, {
            include: includeModels,
            attributes: includeAttributes,
        })
            .catch((err) => {
            throw new Error(err.message);
        });
    }
    async getOne(where) {
        return await this.model.findOne({ where: where }).catch((err) => {
            throw new Error(err.message);
        });
    }
    async post(body) {
        return await this.model.create(body).catch((err) => {
            throw new Error(err.message);
        });
    }
    async bulkCreate(body) {
        return await this.model.bulkCreate(body).catch((err) => {
            throw new Error(err.message);
        });
    }
    async put(id, body) {
        return await this.model
            .update(body, { where: { attribute: { id: id } } })
            .catch((err) => {
            throw new Error(err.message);
        });
    }
    async bulkUpdate(where, body) {
        return await this.model
            .update(body, { where: where })
            .catch((err) => {
            throw new Error(err.message);
        });
    }
    async delete(id) {
        return await this.model
            .destroy({ where: { attribute: { id: id } } })
            .catch((err) => {
            throw new Error(err.message);
        });
    }
    async bulkDelete(where) {
        return await this.model.destroy({ where: where }).catch((err) => {
            console.log(err);
            throw new Error(err.message);
        });
    }
}
exports.default = BaseProvider;
