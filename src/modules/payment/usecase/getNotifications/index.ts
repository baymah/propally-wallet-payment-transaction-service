import { notificationRepo } from "../../repo"
import { GetNotificationController } from "./getNotificationController"
import { GetNotificationUseCase } from "./getNotificationUsecase"

const getNotificationUseCase = new GetNotificationUseCase(notificationRepo)
const getNotificationController = new GetNotificationController(getNotificationUseCase)
export { getNotificationUseCase, getNotificationController }
