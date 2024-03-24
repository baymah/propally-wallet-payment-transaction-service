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
exports.GetUserNotificationUseCase = void 0;
const AppError_1 = require("../../../../core/logic/AppError");
const Result_1 = require("../../../../core/logic/Result");
class GetUserNotificationUseCase {
    constructor(notificationRepo) {
        this.notificationRepo = notificationRepo;
    }
    execute(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notification = yield this.notificationRepo.getUserNotifications(payload.userId, payload.page, payload.perPage);
                const total = notification.count;
                const pagination = {
                    total,
                    page: typeof payload.page == "string" ? parseInt(payload.page) : payload.page || 1,
                    perPage: typeof payload.perPage == "string" ? parseInt(payload.perPage) : payload.perPage || total,
                    pages: Math.ceil(total / (payload.perPage || total)),
                    nextPage: typeof payload.page == "string" ? parseInt(payload.page) : payload.page < Math.ceil(total / (payload.perPage || total)) ? typeof payload.page == "string" ? parseInt(payload.page) : payload.page + 1 : null,
                    previousPage: payload.page > 1 ? payload.page - 1 : null
                };
                const response = {
                    notifications: notification.data,
                    pagination: pagination,
                };
                return (0, Result_1.right)(Result_1.Result.ok(response));
            }
            catch (err) {
                return (0, Result_1.left)(new AppError_1.GenericAppError.UnexpectedError(err));
            }
        });
    }
}
exports.GetUserNotificationUseCase = GetUserNotificationUseCase;
//# sourceMappingURL=getUserNotificationUsecase.js.map