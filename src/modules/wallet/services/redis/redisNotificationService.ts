import { RedisClientType } from "redis"
import { AbstractRedisClient } from "../../../../infra/redis/abstractRedisClient"
import { IRedisNotificationService } from "../IRedisNotificationService"
import { Notification } from "../../../payment/domain/notification"
import { NotificationMap } from "../../mappers/notificationMap"

/**
 * @class Initiate Payment
 * @extends AbstractRedisClient
 * @desc This class is responsible for persisting initiated payment to redis
 * and for signing tokens. It should also be responsible for determining their
 * validity.
 */

export class RedisNotificationService extends AbstractRedisClient implements IRedisNotificationService {
  public HashName = "activeNotificationCode"

  constructor(redisClient: RedisClientType) {
    super(redisClient)
  }
  saveNotification(notification: Notification): Promise<any> {
    const rawNotification = NotificationMap.toPersistence(notification)

    return this.set(rawNotification.id, NotificationMap.serializeObj(rawNotification))
  }

  public async updateNotification(notificationId: string, notification: any): Promise<any> {
    return this.set(notificationId, NotificationMap.serializeObj(notification))
  }

  public async clearNotification(notificationId: string): Promise<any> {
    return this.deleteOne(notificationId)
  }

  public async getNotifcation(notificationId: string): Promise<any> {
    return this.getOneJson(notificationId)
  }

  public async getNotifications(userId: string): Promise<any> {
    return this.getOneJson(this.constructNotificationEventKey(userId))
  }

  public async saveNotifications(userId: string, notification: any): Promise<any> {
    return this.setJson(this.constructNotificationEventKey(userId), NotificationMap.serializeObj(notification))
  }

  private constructNotificationEventKey(notificationId: string): string {
    return `notification-event-${notificationId}`
  }

  public async getCodes(userId: string): Promise<string[]> {
    const keyValues = await this.getAllKeyValue(`*${this.HashName}.${userId}`)
    return keyValues.map((kv) => kv.value)
  }

  public async getOneJson(key: string) {
    const response = await this.getOne(key)
    return NotificationMap.deserializeObj(response as string)
  }
}
