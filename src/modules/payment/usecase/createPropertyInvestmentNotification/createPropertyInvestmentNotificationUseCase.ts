import { PropertyInvestmentNotificationDTO } from "./propertyInvestmentNotificationDTO"
import { UseCase } from "../../../../core/domain/UseCase"
import { INotificationRepo } from "../../repo/NotificationRepo"
import { GenericAppError } from "../../../../core/logic/AppError"
import { Either, Result, left, right } from "../../../../core/logic/Result"
import { joiValidate } from "../../../../infra/http/utils/typeUtils"
import { PropertyInvestmentNotificationDTOSchema } from "./propertyInvestmentNotificationValidation"
import { IPropertyInvestmentNotificationRepo } from "../../repo/PropertyInvestmentNotificationRepo"
import { IUserRepo } from "../../repo/UserRepo"
import { UserId } from "../../domain/userId"
import { User } from "../../domain/user"
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID"
import { PropertyInvestmentNotification } from "../../domain/propertyInvestmentNotification"
import { PropertyId } from "../../domain/propertyId"
import { IPropertyRepo } from "../../repo/PropertyRepo"
import { PropertyNotFound } from "./createPropertyInvestmentNotificationErrors"

type Response = Either<GenericAppError.UnexpectedError | PropertyNotFound | Result<any>, Result<any>>

export class CreatePropertyInvestmentNotificationUseCase implements UseCase<PropertyInvestmentNotificationDTO, Promise<Response>> {
  private notificationRepo: IPropertyInvestmentNotificationRepo

  constructor(
    notificationRepo: IPropertyInvestmentNotificationRepo,
    private userRepo: IUserRepo,
    private propertyRepo: IPropertyRepo,
  ) {
    this.notificationRepo = notificationRepo
  }

  async execute(createNotificationDTO: PropertyInvestmentNotificationDTO): Promise<Response> {
    try {
      const { error, value: vRequest } = joiValidate<PropertyInvestmentNotificationDTO>(PropertyInvestmentNotificationDTOSchema, createNotificationDTO)
      if (error) return left(new GenericAppError.InputError(error.message))

      const { title, type, message, propertyId } = vRequest

      const user = await this.userRepo.get(createNotificationDTO.userId)
      const property = await this.propertyRepo.get(createNotificationDTO.propertyId)

      if (!property) return left(new PropertyNotFound(propertyId))
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

      const property_id = PropertyId.create(new UniqueEntityID(property.id)).getValue()

      const propertyInvestmentnotificationOrError = PropertyInvestmentNotification.create({
        message,
        title,
        type,
        user: userOrError.getValue(),
        userId: user_id,
        propertyId: property_id,
      })

      if (propertyInvestmentnotificationOrError.isFailure) {
        return left(new GenericAppError.InputError(propertyInvestmentnotificationOrError.errorValue))
      }

      const propertyInvestmentNotificationResponse = await this.notificationRepo.savePropertyInvestmentNotification(propertyInvestmentnotificationOrError.getValue())

      return right(Result.ok<any>(propertyInvestmentNotificationResponse)) as Response
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response
    }
  }
}
