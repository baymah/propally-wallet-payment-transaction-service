import { UniqueEntityID } from "../../../core/domain/UniqueEntityID"
import { User } from "../domain/user"
import { UserId } from "../domain/userId"

export type Raw = {
  id: string
  email: string
}

export class UserMap {
  public static toDTO(user: any): Raw {
    return {
      id: user.id,
      email: user.email,
    }
  }

  public static toDomain(raw: Raw): User | undefined {
    const userOrError = User.create(
      {
        email: raw.email,
        userId: UserId.create(new UniqueEntityID(raw.id)).getValue(),
      },
      new UniqueEntityID(raw.id),
    )
    return userOrError.isSuccess ? userOrError.getValue() : undefined
  }
}
