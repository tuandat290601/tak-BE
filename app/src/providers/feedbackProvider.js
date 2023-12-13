"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackProvider = void 0;
const connectProvider_1 = require("./connectProvider");
const baseProvider_1 = __importDefault(require("./baseProvider"));
class FeedbackProvider extends baseProvider_1.default {
    connectProvider;
    constructor(skipInitDb) {
        super("feedback", skipInitDb);
        this.connectProvider = new connectProvider_1.ConnectProvider();
    }
    async bulkCreateFeedback(body) {
        const feedbackConnectItem = [], feedbackToWrite = body.map((data) => {
            const { productId, ...returnData } = data;
            feedbackConnectItem.push({
                productId: productId,
            });
            return returnData;
        });
        return await this.bulkCreate(feedbackToWrite).then(async (response) => {
            const connectFeedback = response.map((item, index) => ({
                feedbackId: item.dataValues.id,
                ...feedbackConnectItem[index],
            }));
            return await this.connectProvider.bulkCreate(connectFeedback).then(() => connectFeedback.map(({ feedbackId, ...rest }) => ({
                ...response.find((item) => item.dataValues.id == feedbackId)
                    ?.dataValues,
                ...rest,
            })));
        });
    }
}
exports.FeedbackProvider = FeedbackProvider;
