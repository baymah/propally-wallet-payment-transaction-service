import Joi from "joi"
import { NotificationDTO } from "./notificationDTO"
import { NotificationType } from "../../../../infra/db/models/notification"

export const NotificationDTOSchema = Joi.object<NotificationDTO>({
  userId: Joi.string().uuid().required(),
  type: Joi.string()
    .valid(...Object.values(NotificationType))
    .required(),
  message: Joi.string().min(3).required(),
  title: Joi.string().min(3).required(),
})
