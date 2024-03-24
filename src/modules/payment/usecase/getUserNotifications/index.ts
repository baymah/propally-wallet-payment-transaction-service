import { notificationRepo } from "../../repo"
import { GetUserNotificationController } from "./getUserNotificationController"
import { GetUserNotificationUseCase } from "./getUserNotificationUsecase"

const getUserNotificationUseCase = new GetUserNotificationUseCase(notificationRepo)
const getUserNotificationController = new GetUserNotificationController(getUserNotificationUseCase)
export { getUserNotificationUseCase, getUserNotificationController }
