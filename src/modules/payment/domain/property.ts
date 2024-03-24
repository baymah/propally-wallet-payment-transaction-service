import { AggregateRoot } from "../../../core/domain/AggregateRoot"
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID"
import { Guard } from "../../../core/logic/Guard"
import { Result } from "../../../core/logic/Result"

interface PropertyProps {
  name: string
}

export class Property extends AggregateRoot<PropertyProps> {
  get propertyId(): string {
    return this._id.toString()
  }

  get name(): string {
    return this.props.name
  }

  constructor(userProps: PropertyProps, id?: UniqueEntityID) {
    super(userProps, id)
  }

  public static create(props: PropertyProps, id?: UniqueEntityID): Result<Property> {
    const guardResult = Guard.againstNullOrUndefinedBulk([{ argument: props.name, argumentName: "name" }])
    if (!guardResult.succeeded) {
      return Result.fail<Property>(guardResult.message || "")
    }

    const property = new Property(
      {
        ...props,
      },
      id,
    )

    const isNewUser = !id

    return Result.ok<Property>(property)
  }
}
