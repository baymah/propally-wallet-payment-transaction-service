import { ActivityEntity } from "../../../infra/db/models/activities"
import { userRepo } from "../../payment/repo"
import { ActivityRepo } from "./ActivityRepo"

const activityRepo = new ActivityRepo(ActivityEntity)

export { activityRepo, userRepo }
