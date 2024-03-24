import { NotificationType } from "../../../../infra/db/models/notification"

export interface NotificationDTO {
  userId: string
  type: NotificationType
  message: string
  title: string
}
