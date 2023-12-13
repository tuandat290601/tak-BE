"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const nconf_1 = __importDefault(require("nconf"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.default = (_express) => {
    const storage = multer_1.default.diskStorage({
        destination: function (_req, _file, cb) {
            const storagePath = nconf_1.default.get("STORE") + "/images";
            fs_1.default.mkdirSync(storagePath, { recursive: true });
            cb(null, storagePath);
        },
        filename: function (_req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + "-" + uniqueSuffix + path_1.default.extname(file.originalname));
        },
    });
    const upload = (0, multer_1.default)({ storage: storage });
    return {
        /**
         * @openapi
         * tags:
         *   name: Files
         *   description: Upload file
         */
        post: {
            middleware: [upload.single("file")],
            handler: async (req, res) => {
                /**
                 * @openapi
                 * /files:
                 *   post:
                 *     tags: [Files]
                 *     description: Upload image
                 *     requestBody:
                 *        required: true
                 *        content:
                 *          multipart/form-data:
                 *            schema:
                 *              type: object
                 *              properties:
                 *                file:
                 *                  required: true
                 *                  type: string
                 *                  format: binary
                 *     responses:
                 *       200:
                 *         description: Success
                 *     security:
                 *       - Bearer: []
                 */
                await uploadFile(req, res);
            },
        },
    };
    async function uploadFile(req, res) {
        return res.sendOk({ path: `/images/${req.file.filename}` });
    }
};
