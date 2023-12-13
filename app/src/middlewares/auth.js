"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const nconf_1 = __importDefault(require("nconf"));
function default_1(req, res, next) {
    const bearerHeader = req.header("Authorization");
    try {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        if (!token)
            return res.sendError(new Error("Bad Auth Token"));
        const verified = (0, jsonwebtoken_1.verify)(token, nconf_1.default.get("JWT:Secret"));
        req.user = verified;
        next();
    }
    catch (err) {
        res.sendErrorStatus(401, "Invalid token");
        res.end();
    }
}
exports.default = default_1;
