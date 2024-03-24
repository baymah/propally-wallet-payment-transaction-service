import { BaseController } from "../../../../core/BaseController"
import { GenericAppError } from "../../../../core/logic/AppError"
import { PropertyNotFound } from "./createPropertyInvestmentNotificationErrors"
import { CreatePropertyInvestmentNotificationUseCase } from "./createPropertyInvestmentNotificationUseCase"
import { PropertyInvestmentNotificationDTO } from "./propertyInvestmentNotificationDTO"

export class CreatePropertyInvestmentNotificationController extends BaseController {
  private useCase: CreatePropertyInvestmentNotificationUseCase

  constructor(useCase: CreatePropertyInvestmentNotificationUseCase) {
    super()
    this.useCase = useCase
  }

  async executeImpl(req: any, res: any): Promise<any> {
    const dto: PropertyInvestmentNotificationDTO = this.req.body as PropertyInvestmentNotificationDTO
    try {
      const result = await this.useCase.execute(dto)
      const resultVal = result.value
      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case GenericAppError.UnexpectedError:
            return this.fail(error.errorValue().message)

          case PropertyNotFound:
            return this.notFound(error.errorValue().message)

          case GenericAppError.InputError:
            return this.clientError(error.errorValue().message)

          default:
            return this.fail(error.errorValue())
        }
      } else {
        return this.ok(this.res, { status: true, message: "User property investment notification created", data: resultVal.getValue() })
      }
    } catch (err) {
      this.fail(err)
    }
  }
}
