import { Notification } from "../../payment/domain/notification"

export interface IRedisNotificationService {
  saveNotification(notification: Notification): Promise<any>
  updateNotification(notificationId: string, notification: any): Promise<any>
  clearNotification(notificationId: string): Promise<any>
  getNotifcation(notificationId: string): Promise<any>
  getNotifications(notificationId: string): Promise<any>
  saveNotifications(notificationId: string, notification: any): Promise<any>
  getCodes(userId: string): Promise<string[]>
}
