import { BaseController } from "../../../../core/BaseController"
import { GenericAppError } from "../../../../core/logic/AppError"
import { CreateNotificationUseCase } from "./createNotificationUseCase"
import { NotificationDTO } from "./notificationDTO"

export class CreateNotificationController extends BaseController {
  private useCase: CreateNotificationUseCase

  constructor(useCase: CreateNotificationUseCase) {
    super()
    this.useCase = useCase
  }

  async executeImpl(req: any, res: any): Promise<any> {
    const dto: NotificationDTO = this.req.body as NotificationDTO
    try {
      const result = await this.useCase.execute(dto)
      const resultVal = result.value
      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case GenericAppError.UnexpectedError:
            return this.fail(error.errorValue().message)

          case GenericAppError.InputError:
            return this.clientError(error.errorValue().message)

          default:
            return this.fail(error.errorValue())
        }
      } else {
        return this.ok(this.res, { status: true, message: "User notification created", data: resultVal.getValue() })
      }
    } catch (err) {
      this.fail(err)
    }
  }
}
