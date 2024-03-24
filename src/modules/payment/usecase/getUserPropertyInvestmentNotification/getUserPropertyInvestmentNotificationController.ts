import { BaseController } from "../../../../core/BaseController"
import { GenericAppError } from "../../../../core/logic/AppError"
import { UserPropertyInvestmentNotificationDTO } from "./getUserPropertyInvestmentNotificationDTO"
import { GetUserPropertyInvestmentNotificationUseCase } from "./getUserPropertyInvestmentNotificationUseCase"

export class GetUserPropertyInvestmentNotificationController extends BaseController {
  private useCase: GetUserPropertyInvestmentNotificationUseCase

  constructor(useCase: GetUserPropertyInvestmentNotificationUseCase) {
    super()
    this.useCase = useCase
  }

  async executeImpl(req: any, res: any): Promise<any> {
    let dto: UserPropertyInvestmentNotificationDTO = {} as UserPropertyInvestmentNotificationDTO
    dto.userId = req.query.userId
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
        return this.ok(this.res, { status: true, message: "User property investment notifications", data: resultVal.getValue() })
      }
    } catch (err) {
      this.fail(err)
    }
  }
}
