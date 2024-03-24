import { Result } from "../../../../core/logic/Result"
import { UseCaseError } from "../../../../core/logic/UseCaseError"

export class PropertyNotFound extends Result<UseCaseError> {
  constructor(propertyId: string) {
    super(false, {
      message: `Property not found ${propertyId}`,
    } as UseCaseError)
  }
}
