import { UniqueEntityID } from "../../../core/domain/UniqueEntityID"
import { Activity } from "../domain/activity"
import { UserId } from "../domain/userId"

export type Raw = {
  id: string
  member: string
  event_name: string
  user_id: string
}

export class ActivityMap {
  public static toDTO(activity: Activity): Raw {
    return {
      id: activity.id.toString(),
      member: activity.member,
      event_name: activity.eventName,
      user_id: activity.userId.id.toString(),
    }
  }

  public static toDomain(raw: Raw): Activity | undefined {
    const propertyOrError = Activity.create(
      {
        member: raw.member,
        eventName: raw.event_name,
        userId: UserId.create(new UniqueEntityID(raw.user_id)).getValue(),
      },
      new UniqueEntityID(raw.id),
    )
    return propertyOrError.isSuccess ? propertyOrError.getValue() : undefined
  }
}
