"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userProvider_1 = require("@providers/userProvider");
const nconf_1 = __importDefault(require("nconf"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (_express) => {
    const userProvider = new userProvider_1.UserProvider();
    return {
        post: {
            // middleware: verify,
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /users/login:
                 *   post:
                 *     tags: [Users]
                 *     description: login user
                 *     produces:
                 *       - application/json
                 *     requestBody:
                 *       required: true
                 *       content:
                 *         application/json:
                 *           schema:
                 *             $ref: '#/components/schemas/login'
                 *     responses:
                 *       200:
                 *         description: Success
                 *
                 */
                await login(req, res);
            },
        },
    };
    async function login(req, res) {
        try {
            const user = await userProvider.getUserByEmail(req.body.email);
            if (!user)
                return res.sendErrorStatus(403, "Tài khoản không hợp lệ");
            const validPassword = await userProvider.comparePassword(req.body.password, user.password);
            if (!validPassword)
                return res.sendErrorStatus(403, "Mật khẩu không chính xác!");
            try {
                //Access token
                const token = jsonwebtoken_1.default.sign({ id: user.id }, nconf_1.default.get("JWT:Secret"), {
                    expiresIn: nconf_1.default.get("JWT:tokenLife"),
                });
                return res.sendOk({
                    accessToken: token,
                    expiresIn: nconf_1.default.get("JWT:refreshTokenLife"),
                });
            }
            catch (error) {
                //   await logService.logErrorAsync(SOURCE, error, req.body);
                return res.sendErrorStatus(401, error);
            }
        }
        catch (error) {
            res.sendError(error);
        }
        res.end();
    }
};
