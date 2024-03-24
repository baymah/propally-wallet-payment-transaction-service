import Joi from "joi"
import { PropertyInvestmentNotificationDTO } from "./propertyInvestmentNotificationDTO"
import { PropertyInvestmentNotificationType } from "../../../../infra/db/models/propertyNotification"

export const PropertyInvestmentNotificationDTOSchema = Joi.object<PropertyInvestmentNotificationDTO>({
  userId: Joi.string().uuid().required(),
  propertyId: Joi.string().uuid().required(),
  type: Joi.string()
    .valid(...Object.values(PropertyInvestmentNotificationType))
    .required(),
  message: Joi.string().min(3).required(),
  title: Joi.string().min(3).required(),
})
