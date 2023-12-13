"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiResponseTemplate_1 = __importDefault(require("../templates/apiResponseTemplate"));
const violationTemplate_1 = __importDefault(require("../templates/violationTemplate"));
exports.default = (req, res, next) => {
    res.sendErrorStatus = function (status, err) {
        var message = err;
        var violations = [];
        res.status(status).json((0, apiResponseTemplate_1.default)(null, message, violations));
    };
    res.sendError = function (err) {
        var message = err.message;
        var violations = [];
        violations.push(new violationTemplate_1.default("400", err.message));
        res.json((0, apiResponseTemplate_1.default)(null, message, violations));
    };
    res.sendOk = function (data, message) {
        res.json((0, apiResponseTemplate_1.default)(data, message));
    };
    next();
};
