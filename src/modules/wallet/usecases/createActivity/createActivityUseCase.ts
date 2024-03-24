import { UseCase } from "../../../../core/domain/UseCase"
import { GenericAppError } from "../../../../core/logic/AppError"
import { Either, Result, left, right } from "../../../../core/logic/Result"
import { joiValidate } from "../../../../infra/http/utils/typeUtils"
import { ActivityDTOSchema } from "./notificationValidation"
import { User } from "../../domain/user"
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID"
import { UserId } from "../../domain/userId"
import { IUserRepo } from "../../repo/UserRepo"
import { ActivityDTO } from "./activityDTO"
import { IActivityRepo } from "../../repo/ActivityRepo"
import { Activity } from "../../domain/activity"
import { IRedisNotificationService } from "../../services/IRedisNotificationService"

type Response = Either<GenericAppError.UnexpectedError | Result<any>, Result<any>>

export class CreateActivityUseCase implements UseCase<ActivityDTO, Promise<Response>> {
  private activityRepo: IActivityRepo

  constructor(
    activityRepo: IActivityRepo,
    private userRepo: IUserRepo,
    private activityRedisService: IRedisNotificationService,
  ) {
    this.activityRepo = activityRepo
  }

  async execute(createActivityDTO: ActivityDTO): Promise<Response> {
    try {
      const { error, value: vRequest } = joiValidate<ActivityDTO>(ActivityDTOSchema, createActivityDTO)
      if (error) return left(new GenericAppError.InputError(error.message))
      const { eventName, member, userId } = vRequest

      const user = await this.userRepo.get(createActivityDTO.userId)
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

      const activityOrError = Activity.create({
        eventName,
        member,
        user: userOrError.getValue(),
        userId: user_id,
      })

      if (activityOrError.isFailure) {
        return left(new GenericAppError.InputError(activityOrError.errorValue))
      }

      const notificationResponse = await this.activityRepo.saveActivity(activityOrError.getValue())
      console.log(notificationResponse, "NOT RESPONSE")
      const userNotifications = await this.activityRedisService.saveNotifications(notificationResponse.user_id, notificationResponse)

      console.log(userNotifications, "USER NOTIFICATION IWN")

      return right(Result.ok<any>(notificationResponse)) as Response
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response
    }
  }
}
