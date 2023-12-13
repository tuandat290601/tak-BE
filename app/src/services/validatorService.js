"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
let validateRegisterUser = () => {
    return [
        (0, express_validator_1.check)("email", "Email không được để trống").not().isEmpty(),
        (0, express_validator_1.check)("email", "Email không hợp lệ").isEmail(),
        (0, express_validator_1.check)("first_name", "Họ không được để trống").not().isEmpty(),
        (0, express_validator_1.check)("first_name", "Họ ít nhất 1 ký tự").isLength({ min: 1 }),
        (0, express_validator_1.check)("first_name", "Họ tối đa 19 ký tự").isLength({ max: 19 }),
        (0, express_validator_1.check)("last_name", "Tên không được để trống").not().isEmpty(),
        (0, express_validator_1.check)("last_name", "Tên ít nhất 1 ký tự").isLength({ min: 1 }),
        (0, express_validator_1.check)("last_name", "Tên tối đa 19 ký tự").isLength({ max: 19 }),
        (0, express_validator_1.check)("password", "Mật khẩu không được để trống").not().isEmpty(),
        (0, express_validator_1.check)("password", "Mật khẩu ít nhất 6 ký tự").isLength({ min: 6 }),
        (0, express_validator_1.check)("password", "Mật khẩu tối đa 19 ký tự").isLength({ max: 19 }),
        (0, express_validator_1.check)("re_password")
            .isLength({ min: 1 })
            .withMessage("Xác nhận mật khẩu bắt buộc nhập"),
        // check('birthday', 'Invalid birthday').isISO8601('yyyy-mm-dd'),
        //  check('password', 'password more than 6 degits').isLength({ min: 6 })
    ];
};
let validateLogin = () => {
    return [
        (0, express_validator_1.check)("email", "Email không được để trống").not().isEmpty(),
        (0, express_validator_1.check)("email", "Email không hợp lệ").isEmail(),
        (0, express_validator_1.check)("password", "Mật khẩu ít nhất 6 ký tự").isLength({ min: 6 }),
        (0, express_validator_1.check)("password", "Mật khẩu tối đa 19 ký tự").isLength({ max: 19 }),
    ];
};
let validateForgetPassword = () => {
    return [
        (0, express_validator_1.check)("email", "Email không được để trống").not().isEmpty(),
        (0, express_validator_1.check)("email", "Email không hợp lệ").isEmail(),
        (0, express_validator_1.check)("email", "Email ít nhất 3 ký tự").isLength({ min: 3 }),
        (0, express_validator_1.check)("email", "Email tối đa 50 ký tự").isLength({ max: 50 }),
    ];
};
let validate = {
    validateRegisterUser: validateRegisterUser,
    validateLogin: validateLogin,
    validateForgetPassword: validateForgetPassword,
};
exports.default = { validate };
