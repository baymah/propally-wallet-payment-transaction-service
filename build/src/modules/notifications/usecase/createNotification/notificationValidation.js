"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationDTOSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const notification_1 = require("../../../../infra/db/models/notification");
exports.NotificationDTOSchema = joi_1.default.object({
    userId: joi_1.default.string().uuid().required(),
    type: joi_1.default.string()
        .valid(...Object.values(notification_1.NotificationType))
        .required(),
    message: joi_1.default.string().min(3).required(),
    title: joi_1.default.string().min(3).required(),
});
//# sourceMappingURL=notificationValidation.js.map