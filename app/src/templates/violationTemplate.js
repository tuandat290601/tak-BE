"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ViolationTemplate {
    code;
    message;
    action;
    constructor(code, message, action = null) {
        this.code = code;
        this.message = message;
        this.action = action;
    }
}
exports.default = ViolationTemplate;
