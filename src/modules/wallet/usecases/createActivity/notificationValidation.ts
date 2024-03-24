import Joi from "joi"
import { NotificationType } from "../../../../infra/db/models/notification"
import { ActivityDTO } from "./activityDTO"

export const ActivityDTOSchema = Joi.object<ActivityDTO>({
  userId: Joi.string().uuid().required(),
  eventName: Joi.string().required(),
  member: Joi.string().min(3).required(),
})
