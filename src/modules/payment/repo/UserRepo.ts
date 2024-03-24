import { UserMap } from "../mappers/userMap"
import { User } from "../domain/user"
import { UserEntity } from "../../../infra/db/models/UserEntity"

export interface IUserRepo {
  get(userId: string)
  // getUserPropertyInvestmentNotifications(userId: string, page: number, pageLimit: number)
  // savePropertyInvestmentNotification(investmentTransaction: any)
}

export class UserRepo implements IUserRepo {
  private models: any
  DEFAULT_PAGE = 0
  DEFAULT_SIZE = 5

  //#region ctor
  constructor(models: any) {
    this.models = models
  }
  //#endregion

  public async get(userId: string): Promise<User | null> {
    try {
      const result = await UserEntity.find({ where: { id: userId } })
      if (!result.length) return null

      return UserMap.toDomain(result[0])
    } catch (error) {
      console.log(error.message)
    }
  }
}
