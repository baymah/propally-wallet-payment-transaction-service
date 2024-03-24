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
exports.NotificationRepo = void 0;
const UniqueEntityID_1 = require("../../../core/domain/UniqueEntityID");
const notification_1 = require("../../../infra/db/models/notification");
class NotificationRepo {
    //#region ctor
    constructor(models) {
        this.DEFAULT_PAGE = 0;
        this.DEFAULT_SIZE = 5;
        //#endregion
        //#region  Private methods
        //helper method
        this.getPagination = (page = this.DEFAULT_PAGE, pageLimit = this.DEFAULT_SIZE) => {
            const offset = (page - 1) * pageLimit;
            const limit = pageLimit;
            return { limit, offset };
        };
        this.models = models;
    }
    //#endregion
    //#region query
    getUserNotifications(userId, page, pageLimit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, offset } = this.getPagination(page, pageLimit);
                console.log(limit, offset);
                const [result, total] = yield notification_1.UserNotification.findAndCount({
                    where: { user_id: userId },
                    order: { createdAt: "DESC" },
                    take: limit,
                    skip: offset,
                });
                return {
                    data: result,
                    count: total,
                };
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    getAll(page, pageLimit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const keyword = query.keyword || '';
                const { limit, offset } = this.getPagination(page, pageLimit);
                console.log(limit, offset);
                const [result, total] = yield notification_1.UserNotification.findAndCount({
                    // where: { name: Like('%' + keyword + '%') },
                    order: { createdAt: "DESC" },
                    take: limit,
                    skip: offset,
                });
                return {
                    data: result,
                    count: total,
                };
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
    //#endregion
    //#region commands
    saveNotification(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createNotification = notification_1.UserNotification.create({
                    id: new UniqueEntityID_1.UniqueEntityID().toString(),
                    message: notification.message,
                    type: notification.type,
                    title: notification.title,
                    user_id: notification.userId,
                });
                yield createNotification.save();
                return createNotification;
            }
            catch (Error) {
                console.log(Error);
            }
        });
    }
}
exports.NotificationRepo = NotificationRepo;
//# sourceMappingURL=NotificationRepo.js.map