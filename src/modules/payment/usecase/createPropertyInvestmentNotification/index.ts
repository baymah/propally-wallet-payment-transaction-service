import { propertyInvestmentRepo, propertyRepo, userRepo } from "../../repo"
import { CreatePropertyInvestmentNotificationUseCase } from "./createPropertyInvestmentNotificationUseCase"
import { CreatePropertyInvestmentNotificationController } from "./createPropertyInvestmentNotificationController"

const createPropertyInvestmentNotificationUseCase = new CreatePropertyInvestmentNotificationUseCase(propertyInvestmentRepo, userRepo, propertyRepo)
const createPropertyInvestmentNotificationController = new CreatePropertyInvestmentNotificationController(createPropertyInvestmentNotificationUseCase)
export { createPropertyInvestmentNotificationUseCase, createPropertyInvestmentNotificationController }
