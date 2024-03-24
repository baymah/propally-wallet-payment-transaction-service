import { ActivityEntity } from "../../../infra/db/models/activities"
import { Activity } from "../domain/activity"

export interface IActivityRepo {
  getAll(page: number, pageLimit: number)
  getUserActivities(userId: string, page: number, pageLimit: number)
  saveActivity(activity: Activity)
}

export class ActivityRepo implements IActivityRepo {
  private models: any
  DEFAULT_PAGE = 0
  DEFAULT_SIZE = 5

  //#region ctor
  constructor(models: any) {
    this.models = models
  }
  //#endregion

  //#region query
  public async getUserActivities(userId: string, page: number, pageLimit: number) {
    try {
      const { limit, offset } = this.getPagination(page, pageLimit)
      console.log(limit, offset)
      const [result, total] = await ActivityEntity.findAndCount({
        where: { user_id: userId },
        order: { createdAt: "DESC" },
        take: limit,
        skip: offset,
      })
      return {
        data: result,
        count: total,
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  public async getAll(page: number, pageLimit: number) {
    try {
      // const keyword = query.keyword || '';
      const { limit, offset } = this.getPagination(page, pageLimit)
      console.log(limit, offset)
      const [result, total] = await ActivityEntity.findAndCount({
        // where: { name: Like('%' + keyword + '%') },
        order: { createdAt: "DESC" },
        take: limit,
        skip: offset,
      })

      return {
        data: result,
        count: total,
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  //#endregion

  //#region commands
  public async saveActivity(activity: Activity) {
    try {
      const createActivity = ActivityEntity.create({
        id: activity.activityId,
        event_name: activity.eventName,
        member: activity.member,
        user_id: activity.userId.id.toString(),
      })

      await createActivity.save()
      return createActivity
    } catch (Error) {
      throw Error
      console.log(Error)
    }
  }
  //#endregion

  //#region  Private methods
  //helper method
  private getPagination = (page: number = this.DEFAULT_PAGE, pageLimit: number = this.DEFAULT_SIZE) => {
    const offset = (page - 1) * pageLimit
    const limit = pageLimit
    return { limit, offset }
  }
  //#endregion
}
