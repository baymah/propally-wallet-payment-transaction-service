"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyInvestmentNotificationDTOSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const propertyNotification_1 = require("../../../../infra/db/models/propertyNotification");
exports.PropertyInvestmentNotificationDTOSchema = joi_1.default.object({
    userId: joi_1.default.string().uuid().required(),
    propertyId: joi_1.default.string().uuid().required(),
    type: joi_1.default.string()
        .valid(...Object.values(propertyNotification_1.PropertyInvestmentNotificationType))
        .required(),
    message: joi_1.default.string().min(3).required(),
    title: joi_1.default.string().min(3).required(),
});
//# sourceMappingURL=propertyInvestmentNotificationValidation.js.map