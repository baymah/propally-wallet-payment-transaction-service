import { activityRepo, userRepo } from "../../repo"
import { redisNotificationService } from "../../services"
import { CreateActivityController } from "./createActivityController"
import { CreateActivityUseCase } from "./createActivityUseCase"

const createActivityUseCase = new CreateActivityUseCase(activityRepo, userRepo, redisNotificationService)
const createActivityController = new CreateActivityController(createActivityUseCase)
export { createActivityUseCase, createActivityController }
