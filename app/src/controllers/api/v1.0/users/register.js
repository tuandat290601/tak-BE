"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userProvider_1 = require("@providers/userProvider");
exports.default = (_express) => {
    const userProvider = new userProvider_1.UserProvider();
    return {
        post: {
            // middleware: verify,
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /users/register:
                 *   post:
                 *     tags: [Users]
                 *     description: Register new user
                 *     produces:
                 *       - application/json
                 *     requestBody:
                 *       required: true
                 *       content:
                 *         application/json:
                 *           schema:
                 *             $ref: '#/components/schemas/register'
                 *     responses:
                 *       200:
                 *         description: Success
                 *
                 */
                await register(req, res);
            },
        },
    };
    async function register(req, res) {
        try {
            const user = await userProvider
                .getUserByEmail(req.body.email)
                .catch((err) => {
                throw new Error(err.message);
            });
            if (user)
                return res.sendError(new Error("Tài khoản đã tồn tại"));
            const passwordHash = await userProvider
                .hashPassword(req.body.password)
                .catch((err) => {
                throw new Error(err.message);
            });
            const userCreate = {
                fullName: req.body.fullName,
                email: req.body.email,
                password: passwordHash,
                createdAt: new Date(),
            };
            await userProvider.post(userCreate).catch((err) => {
                throw new Error(err.message);
            });
            return res.sendOk("Tạo tài khoản thành công");
        }
        catch (error) {
            res.sendError(error);
        }
        res.end();
    }
};
