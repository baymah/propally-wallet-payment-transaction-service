import { PropertyInvestmentNotificationType } from "../../../../infra/db/models/UserEntity"
import { NotificationType } from "../../../../infra/db/models/notification"

export interface PropertyInvestmentNotificationDTO {
  userId: string
  propertyId: string
  type: PropertyInvestmentNotificationType
  message: string
  title: string
}
