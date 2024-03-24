"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPropertyInvestmentNotificationController = exports.createPropertyInvestmentNotificationUseCase = void 0;
const repo_1 = require("../../repo");
const createPropertyInvestmentNotificationUseCase_1 = require("./createPropertyInvestmentNotificationUseCase");
const createPropertyInvestmentNotificationController_1 = require("./createPropertyInvestmentNotificationController");
const createPropertyInvestmentNotificationUseCase = new createPropertyInvestmentNotificationUseCase_1.CreatePropertyInvestmentNotificationUseCase(repo_1.propertyInvestmentRepo);
exports.createPropertyInvestmentNotificationUseCase = createPropertyInvestmentNotificationUseCase;
const createPropertyInvestmentNotificationController = new createPropertyInvestmentNotificationController_1.CreatePropertyInvestmentNotificationController(createPropertyInvestmentNotificationUseCase);
exports.createPropertyInvestmentNotificationController = createPropertyInvestmentNotificationController;
//# sourceMappingURL=index.js.map