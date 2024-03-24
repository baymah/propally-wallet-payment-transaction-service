import { notificationRepo, userRepo } from "../../repo"
import { CreateNotificationUseCase } from "./createNotificationUseCase"
import { CreateNotificationController } from "./createNotificationController"

const createNotificationUseCase = new CreateNotificationUseCase(notificationRepo, userRepo)
const createNotificationController = new CreateNotificationController(createNotificationUseCase)
export { createNotificationUseCase, createNotificationController }
