import { UseCase } from "../../../../core/domain/UseCase"
import { INotificationRepo } from "../../repo/NotificationRepo"
import { GenericAppError } from "../../../../core/logic/AppError"
import { Either, Result, left, right } from "../../../../core/logic/Result"
import { UserPropertyInvestmentNotificationDTO } from "./getUserPropertyInvestmentNotificationDTO"
import { IPropertyInvestmentNotificationRepo } from "../../repo/PropertyInvestmentNotificationRepo"

type Response = Either<GenericAppError.UnexpectedError | Result<any>, Result<any>>

export class GetUserPropertyInvestmentNotificationUseCase implements UseCase<UserPropertyInvestmentNotificationDTO, Promise<Response>> {
  private propertyInvestmentNotificationRepo: IPropertyInvestmentNotificationRepo

  constructor(propertyInvestmentNotificationRepo: IPropertyInvestmentNotificationRepo) {
    this.propertyInvestmentNotificationRepo = propertyInvestmentNotificationRepo
  }

  async execute(payload: UserPropertyInvestmentNotificationDTO): Promise<Response> {
    try {
      const notification = await this.propertyInvestmentNotificationRepo.getUserPropertyInvestmentNotifications(payload.userId, payload.page, payload.perPage)
      const total = notification.count
      const pagination = {
        total,
        page: typeof payload.page == "string" ? parseInt(payload.page) : payload.page || 1,
        perPage: typeof payload.perPage == "string" ? parseInt(payload.perPage) : payload.perPage || total,
        pages: Math.ceil(total / (payload.perPage || total)),
        nextPage:
          typeof payload.page == "string"
            ? parseInt(payload.page)
            : payload.page < Math.ceil(total / (payload.perPage || total))
            ? typeof payload.page == "string"
              ? parseInt(payload.page)
              : payload.page + 1
            : null,
        previousPage: payload.page > 1 ? payload.page - 1 : null,
      }
      const response = {
        notifications: notification.data,
        pagination: pagination,
      }

      return right(Result.ok<any>(response)) as Response
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response
    }
  }
}
