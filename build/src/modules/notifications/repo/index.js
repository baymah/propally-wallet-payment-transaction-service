"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyInvestmentRepo = exports.notificationRepo = void 0;
const notification_1 = require("../../../infra/db/models/notification");
const propertyNotification_1 = require("../../../infra/db/models/propertyNotification");
const NotificationRepo_1 = require("./NotificationRepo");
const PropertyInvestmentNotificationRepo_1 = require("./PropertyInvestmentNotificationRepo");
const notificationRepo = new NotificationRepo_1.NotificationRepo(notification_1.UserNotification);
exports.notificationRepo = notificationRepo;
const propertyInvestmentRepo = new PropertyInvestmentNotificationRepo_1.PropertyInvestmentNotificationRepo(propertyNotification_1.PropertyInvestmentNotification);
exports.propertyInvestmentRepo = propertyInvestmentRepo;
//# sourceMappingURL=index.js.map