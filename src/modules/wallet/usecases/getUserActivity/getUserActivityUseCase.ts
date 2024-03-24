import { UseCase } from "../../../../core/domain/UseCase"
import { GenericAppError } from "../../../../core/logic/AppError"
import { Either, Result, left, right } from "../../../../core/logic/Result"
import { slackNotify } from "../../../../infra/slack"
import { IActivityRepo } from "../../repo/ActivityRepo"
import { IRedisNotificationService } from "../../services/IRedisNotificationService"
import { UserActivityDTO } from "./getUserActivityDTO"

type Response = Either<GenericAppError.UnexpectedError | Result<any>, Result<any>>

export class GetUserActivityUseCase implements UseCase<UserActivityDTO, Promise<Response>> {
  private activityRepo: IActivityRepo

  constructor(
    activityRepo: IActivityRepo,
    private activityRedisService: IRedisNotificationService,
  ) {
    this.activityRepo = activityRepo
  }

  async execute(payload: UserActivityDTO): Promise<Response> {
    try {
      const notification = await this.activityRepo.getUserActivities(payload.userId, payload.page, payload.perPage)
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

      //#region SLack Notify
      await slackNotify(`==========Activity Usecase==========,
            User Activity Response:${JSON.stringify(notification.data, null, "\n")},
            `);
      //#endregion

      const response = {
        notifications: notification.data,
        pagination: pagination,
      }
      
      // console.log("REdis user notidication",await this.activityRedisService.getNotifications(payload.userId));
      
      return right(Result.ok<any>(response)) as Response
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response
    }
  }
}
