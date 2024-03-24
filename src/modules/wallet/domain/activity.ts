import { AggregateRoot } from "../../../core/domain/AggregateRoot"
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID"
import { Guard } from "../../../core/logic/Guard"
import { Result } from "../../../core/logic/Result"
import { UserId } from "./userId"
import { User } from "./user"
import { ActivityCreated } from "../../messaging/domain/events/activityCreated"

interface ActivityProps {
  userId: UserId
  eventName: string
  member: string
  user?: User
}

export class Activity extends AggregateRoot<ActivityProps> {
  get activityId(): string {
    return this._id.toString()
  }
  get userId(): UserId {
    return this.props.userId
  }
  get eventName(): string {
    return this.props.eventName
  }
  get member(): string {
    return this.props.member
  }
  get user(): User {
    return this.props.user
  }

  constructor(userProps: ActivityProps, id?: UniqueEntityID) {
    super(userProps, id)
  }

  public static create(props: ActivityProps, id?: UniqueEntityID): Result<Activity> {
    const guardResult = Guard.againstNullOrUndefinedBulk([{ argument: props.member, argumentName: "member" }])
    if (!guardResult.succeeded) {
      return Result.fail<Activity>(guardResult.message || "")
    }

    const activity = new Activity(
      {
        ...props,
      },
      id,
    )

    const isNewActivity = !id

    if (isNewActivity) {
      activity.addDomainEvent(new ActivityCreated(activity))
    }

    return Result.ok<Activity>(activity)
  }
}
