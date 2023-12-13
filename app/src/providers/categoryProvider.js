"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryProvider = void 0;
const baseProvider_1 = __importDefault(require("./baseProvider"));
class CategoryProvider extends baseProvider_1.default {
    constructor(skipInitDb) {
        super("category", skipInitDb);
    }
}
exports.CategoryProvider = CategoryProvider;
