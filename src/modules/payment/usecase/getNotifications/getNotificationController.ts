import { BaseController } from "../../../../core/BaseController"
import { GenericAppError } from "../../../../core/logic/AppError"
import { NotificationDTO } from "./getNotificationDTO"
import { GetNotificationUseCase } from "./getNotificationUsecase"

export class GetNotificationController extends BaseController {
  private useCase: GetNotificationUseCase

  constructor(useCase: GetNotificationUseCase) {
    super()
    this.useCase = useCase
  }

  async executeImpl(req: any, res: any): Promise<any> {
    let dto: NotificationDTO = {} as NotificationDTO
    dto.page = req.query.page || 1
    dto.perPage = req.query.perPage || 10

    try {
      const result = await this.useCase.execute(dto)
      const resultVal = result.value
      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case GenericAppError.UnexpectedError:
            return this.conflict(error.errorValue().message)
          default:
            return this.fail(error.errorValue())
        }
      } else {
        return this.ok(this.res, { status: true, message: "User notifications", data: resultVal.getValue() })
      }
    } catch (err) {
      this.fail(err)
    }
  }
}
