import { not } from "joi"
import { Notification } from "../../payment/domain/notification"

export type Raw = {
  id: string
  type: string
  message: string
  title: string
  user_id: string
}

export class NotificationMap {
  public static toDTO(notification: Notification): Raw {
    return {
      id: notification.id.toString(),
      type: notification.type,
      message: notification.message,
      title: notification.title,
      user_id: notification.userId.id.toString(),
    }
  }

  public static toPersistence(notification: Notification): Raw {
    return {
      id: notification.id.toString(),
      type: notification.type,
      message: notification.message,
      title: notification.title,
      user_id: notification.userId.id.toString(),
    }
  }
  public static serializeObj(notification: Raw): string {
    return JSON.stringify(notification)
  }

  public static deserializeObj(notification: string): string {
    return JSON.parse(notification)
  }
}
