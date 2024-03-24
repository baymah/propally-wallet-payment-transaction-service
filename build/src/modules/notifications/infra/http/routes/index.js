"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyInvestmentRouter = exports.notificationRouter = void 0;
const express_1 = __importDefault(require("express"));
const createNotification_1 = require("../../../usecase/createNotification");
const getNotifications_1 = require("../../../usecase/getNotifications");
const getUserNotifications_1 = require("../../../usecase/getUserNotifications");
const createPropertyInvestmentNotification_1 = require("../../../usecase/createPropertyInvestmentNotification");
const notificationRouter = express_1.default.Router();
exports.notificationRouter = notificationRouter;
const propertyInvestmentRouter = express_1.default.Router();
exports.propertyInvestmentRouter = propertyInvestmentRouter;
notificationRouter.post("/", (req, res) => {
    createNotification_1.createNotificationController.execute(req, res, () => createNotification_1.createNotificationController.executeImpl(req, res));
});
notificationRouter.get("/", (req, res) => {
    getNotifications_1.getNotificationController.execute(req, res, () => getNotifications_1.getNotificationController.executeImpl(req, res));
});
notificationRouter.get("/user-notifications", (req, res) => {
    getUserNotifications_1.getUserNotificationController.execute(req, res, () => getUserNotifications_1.getUserNotificationController.executeImpl(req, res));
});
//Property Investment routes;
//#region 
propertyInvestmentRouter.get("/user-property-investment-notifications", (req, res) => {
    getUserNotifications_1.getUserNotificationController.execute(req, res, () => getUserNotifications_1.getUserNotificationController.executeImpl(req, res));
});
propertyInvestmentRouter.get("/", (req, res) => {
    getNotifications_1.getNotificationController.execute(req, res, () => getNotifications_1.getNotificationController.executeImpl(req, res));
});
propertyInvestmentRouter.post("/", (req, res) => {
    createPropertyInvestmentNotification_1.createPropertyInvestmentNotificationController.execute(req, res, () => createPropertyInvestmentNotification_1.createPropertyInvestmentNotificationController.executeImpl(req, res));
});
//# sourceMappingURL=index.js.map