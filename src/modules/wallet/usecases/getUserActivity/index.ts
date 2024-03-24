import { activityRepo, userRepo } from "../../repo"
import { redisNotificationService } from "../../services"
import { GetUserActivityController } from "./getUserActivityController"
import { GetUserActivityUseCase } from "./getUserActivityUseCase"

const getUserActivityUseCase = new GetUserActivityUseCase(activityRepo, redisNotificationService)
const getUserActivityController = new GetUserActivityController(getUserActivityUseCase)
export { getUserActivityUseCase, getUserActivityController }
