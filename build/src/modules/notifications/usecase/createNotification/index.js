"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationController = exports.createNotificationUseCase = void 0;
const repo_1 = require("../../repo");
const createNotificationUseCase_1 = require("./createNotificationUseCase");
const createNotificationController_1 = require("./createNotificationController");
const createNotificationUseCase = new createNotificationUseCase_1.CreateNotificationUseCase(repo_1.notificationRepo);
exports.createNotificationUseCase = createNotificationUseCase;
const createNotificationController = new createNotificationController_1.CreateNotificationController(createNotificationUseCase);
exports.createNotificationController = createNotificationController;
//# sourceMappingURL=index.js.map