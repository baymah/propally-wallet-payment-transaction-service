import { Like } from "typeorm"
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID"
import { UserNotification } from "../../../infra/db/models/notification"
import { Notification } from "../domain/notification"

export interface INotificationRepo {
  getAll(page: number, pageLimit: number)
  getUserNotifications(userId: string, page: number, pageLimit: number)
  saveNotification(notification: Notification)
}

export class NotificationRepo implements INotificationRepo {
  private models: any
  DEFAULT_PAGE = 0
  DEFAULT_SIZE = 5

  //#region ctor
  constructor(models: any) {
    this.models = models
  }
  //#endregion

  //#region query
  public async getUserNotifications(userId: string, page: number, pageLimit: number) {
    try {
      const { limit, offset } = this.getPagination(page, pageLimit)
      console.log(limit, offset)
      const [result, total] = await UserNotification.findAndCount({
        where: { user_id: userId },
        order: { createdAt: "DESC" },
        take: limit,
        skip: offset,
      })
      return {
        data: result,
        count: total,
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  public async getAll(page: number, pageLimit: number) {
    try {
      // const keyword = query.keyword || '';
      const { limit, offset } = this.getPagination(page, pageLimit)
      console.log(limit, offset)
      const [result, total] = await UserNotification.findAndCount({
        // where: { name: Like('%' + keyword + '%') },
        order: { createdAt: "DESC" },
        take: limit,
        skip: offset,
      })

      return {
        data: result,
        count: total,
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  //#endregion

  //#region commands
  public async saveNotification(notification: Notification) {
    try {
      const createNotification = UserNotification.create({
        id: notification.notificationId,
        message: notification.message,
        type: notification.type,
        title: notification.title,
        user_id: notification.userId.id.toString(),
      })

      await createNotification.save()
      return createNotification
    } catch (Error) {
      throw Error
      console.log(Error)
    }
  }
  //#endregion

  //#region  Private methods
  //helper method
  private getPagination = (page: number = this.DEFAULT_PAGE, pageLimit: number = this.DEFAULT_SIZE) => {
    const offset = (page - 1) * pageLimit
    const limit = pageLimit
    return { limit, offset }
  }
  //#endregion
}
