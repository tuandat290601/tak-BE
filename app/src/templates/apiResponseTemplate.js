"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (data, message, violations) => ({
    message: !message ? null : message,
    responseData: !data ? null : data,
    status: violations === undefined || violations === null || violations.length == 0
        ? "success"
        : "fail",
    timeStamp: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
    violations: !violations ? null : violations,
});
