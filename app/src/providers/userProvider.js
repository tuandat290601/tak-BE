"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProvider = void 0;
const baseProvider_1 = __importDefault(require("./baseProvider"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserProvider extends baseProvider_1.default {
    constructor(skipInitDb) {
        super("user", skipInitDb);
    }
    async getUserByEmail(email) {
        return await this.getOne({ email: email })
            .then((data) => (data == null ? null : data.dataValues))
            .catch((err) => {
            throw new Error(err.message);
        });
    }
    async hashPassword(password) {
        try {
            const salt = await bcrypt_1.default.genSalt(10).catch((err) => {
                throw new Error(err.message);
            });
            return bcrypt_1.default.hashSync(password, salt);
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async comparePassword(password, passwordHash) {
        return await bcrypt_1.default.compare(password, passwordHash).catch((err) => {
            throw new Error(err.message);
        });
    }
}
exports.UserProvider = UserProvider;
