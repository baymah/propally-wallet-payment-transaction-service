import { AggregateRoot } from "../../../core/domain/AggregateRoot"
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID"
import { Guard } from "../../../core/logic/Guard"
import { Result } from "../../../core/logic/Result"
import { UserId } from "./userId"

interface UserProps {
  userId: UserId
  email: string
}

export class User extends AggregateRoot<UserProps> {
  get userId(): UserId {
    return this.props.userId
  }

  get email(): string {
    return this.props.email
  }

  constructor(userProps: UserProps, id?: UniqueEntityID) {
    super(userProps, id)
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([{ argument: props.email, argumentName: "email" }])
    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message || "")
    }

    const user = new User(
      {
        ...props,
      },
      id,
    )

    const isNewUser = !id

    return Result.ok<User>(user)
  }
}
