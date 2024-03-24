import { Like } from "typeorm"
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID"
import { PropertyInvestmentNotificationEntity } from "../../../infra/db/models/propertyNotification"
import { PropertyInvestmentNotification } from "../domain/propertyInvestmentNotification"

export interface IPropertyInvestmentNotificationRepo {
  getAll(page: number, pageLimit: number)
  getUserPropertyInvestmentNotifications(userId: string, page: number, pageLimit: number)
  savePropertyInvestmentNotification(investmentTransaction: any)
}

export class PropertyInvestmentNotificationRepo implements IPropertyInvestmentNotificationRepo {
  private models: any
  DEFAULT_PAGE = 0
  DEFAULT_SIZE = 5

  //#region ctor
  constructor(models: any) {
    this.models = models
  }
  //#endregion

  //#region query
  public async getUserPropertyInvestmentNotifications(userId: string, page: number, pageLimit: number) {
    try {
      const { limit, offset } = this.getPagination(page, pageLimit)
      console.log(limit, offset)
      const [result, total] = await PropertyInvestmentNotificationEntity.findAndCount({
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
      const [result, total] = await PropertyInvestmentNotificationEntity.findAndCount({
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
  public async savePropertyInvestmentNotification(notification: PropertyInvestmentNotification) {
    try {
      const createNotification = PropertyInvestmentNotificationEntity.create({
        id: notification.id.toString(),
        message: notification.message,
        type: notification.type,
        title: notification.title,
        user_id: notification.userId.id.toString(),
        property_id: notification.propertyId.toString(),
      })

      await createNotification.save()
      return createNotification
    } catch (Error) {
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
