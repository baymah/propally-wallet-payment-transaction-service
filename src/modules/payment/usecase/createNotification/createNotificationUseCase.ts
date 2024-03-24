import { NotificationDTO } from "./notificationDTO"
import { UseCase } from "../../../../core/domain/UseCase"
import { INotificationRepo } from "../../repo/NotificationRepo"
import { GenericAppError } from "../../../../core/logic/AppError"
import { Either, Result, left, right } from "../../../../core/logic/Result"
import { joiValidate } from "../../../../infra/http/utils/typeUtils"
import { NotificationDTOSchema } from "./notificationValidation"
import { Notification } from "../../domain/notification"
import { User } from "../../domain/user"
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID"
import { UserId } from "../../domain/userId"
import { IUserRepo } from "../../repo/UserRepo"

type Response = Either<GenericAppError.UnexpectedError | Result<any>, Result<any>>

export class CreateNotificationUseCase implements UseCase<NotificationDTO, Promise<Response>> {
  private notificationRepo: INotificationRepo

  constructor(
    notificationRepo: INotificationRepo,
    private userRepo: IUserRepo,
  ) {
    this.notificationRepo = notificationRepo
  }

  async execute(createNotificationDTO: NotificationDTO): Promise<Response> {
    try {
      const { error, value: vRequest } = joiValidate<NotificationDTO>(NotificationDTOSchema, createNotificationDTO)
      if (error) return left(new GenericAppError.InputError(error.message))
      const { title, type, userId, message } = vRequest

      const user = await this.userRepo.get(createNotificationDTO.userId)
      //todo, check if the user exist... cehck the jwt too.
      //or consume the data from redis

      const user_id = UserId.create(new UniqueEntityID(user.id)).getValue()
      const userOrError = User.create({
        email: user.email,
        userId: user_id,
      })

      if (userOrError.isFailure) {
        return left(new GenericAppError.InputError(userOrError.errorValue))
      }

      const notificationOrError = Notification.create({
        message,
        title,
        type,
        user: userOrError.getValue(),
        userId: user_id,
      })

      if (notificationOrError.isFailure) {
        return left(new GenericAppError.InputError(notificationOrError.errorValue))
      }

      const notificationResponse = await this.notificationRepo.saveNotification(notificationOrError.getValue())

      return right(Result.ok<any>(notificationResponse)) as Response
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response
    }
  }
}
