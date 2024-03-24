"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserNotificationController = exports.getUserNotificationUseCase = void 0;
const repo_1 = require("../../repo");
const getUserNotificationController_1 = require("./getUserNotificationController");
const getUserNotificationUsecase_1 = require("./getUserNotificationUsecase");
const getUserNotificationUseCase = new getUserNotificationUsecase_1.GetUserNotificationUseCase(repo_1.notificationRepo);
exports.getUserNotificationUseCase = getUserNotificationUseCase;
const getUserNotificationController = new getUserNotificationController_1.GetUserNotificationController(getUserNotificationUseCase);
exports.getUserNotificationController = getUserNotificationController;
//# sourceMappingURL=index.js.map