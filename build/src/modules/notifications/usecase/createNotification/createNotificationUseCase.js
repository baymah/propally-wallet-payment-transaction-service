"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNotificationUseCase = void 0;
const AppError_1 = require("../../../../core/logic/AppError");
const Result_1 = require("../../../../core/logic/Result");
const typeUtils_1 = require("../../../../infra/http/utils/typeUtils");
const notificationValidation_1 = require("./notificationValidation");
class CreateNotificationUseCase {
    constructor(notificationRepo) {
        this.notificationRepo = notificationRepo;
    }
    execute(createNotificationDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value: vRequest } = (0, typeUtils_1.joiValidate)(notificationValidation_1.NotificationDTOSchema, createNotificationDTO);
                if (error)
                    return (0, Result_1.left)(new AppError_1.GenericAppError.InputError(error.message));
                //todo, check if the user exist... cehck the jwt too.
                //or consume the data from redis
                const { title, type, userId, message } = vRequest;
                const notification = yield this.notificationRepo.saveNotification(createNotificationDTO);
                return (0, Result_1.right)(Result_1.Result.ok(notification));
            }
            catch (err) {
                return (0, Result_1.left)(new AppError_1.GenericAppError.UnexpectedError(err));
            }
        });
    }
}
exports.CreateNotificationUseCase = CreateNotificationUseCase;
//# sourceMappingURL=createNotificationUseCase.js.map