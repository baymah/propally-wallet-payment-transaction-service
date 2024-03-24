import { UseCase } from "../../../../core/domain/UseCase"
import { INotificationRepo } from "../../repo/NotificationRepo"
import { GenericAppError } from "../../../../core/logic/AppError"
import { Either, Result, left, right } from "../../../../core/logic/Result"
import { NotificationDTO } from "./getNotificationDTO"

type Response = Either<GenericAppError.UnexpectedError | Result<any>, Result<any>>

export class GetNotificationUseCase implements UseCase<NotificationDTO, Promise<Response>> {
  private notificationRepo: INotificationRepo

  constructor(notificationRepo: INotificationRepo) {
    this.notificationRepo = notificationRepo
  }

  async execute(payload: NotificationDTO): Promise<Response> {
    try {
      const notification = await this.notificationRepo.getAll(payload.page, payload.perPage)
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
