"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationController = exports.getNotificationUseCase = void 0;
const repo_1 = require("../../repo");
const getNotificationController_1 = require("./getNotificationController");
const getNotificationUsecase_1 = require("./getNotificationUsecase");
const getNotificationUseCase = new getNotificationUsecase_1.GetNotificationUseCase(repo_1.notificationRepo);
exports.getNotificationUseCase = getNotificationUseCase;
const getNotificationController = new getNotificationController_1.GetNotificationController(getNotificationUseCase);
exports.getNotificationController = getNotificationController;
//# sourceMappingURL=index.js.map