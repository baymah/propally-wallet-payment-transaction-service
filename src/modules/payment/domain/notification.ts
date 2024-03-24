import { AggregateRoot } from "../../../core/domain/AggregateRoot"
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID"
import { Guard } from "../../../core/logic/Guard"
import { Result } from "../../../core/logic/Result"
import { NotificationType } from "../../../infra/db/models/notification"
import { UserId } from "./userId"
import { NotificationCreated } from "../../messaging/domain/events/notificationCreated"
import { User } from "./user"

interface NotificationProps {
  userId: UserId
  title: string
  message: string
  type: NotificationType
  user: User
}

export class Notification extends AggregateRoot<NotificationProps> {
  get notificationId(): string {
    return this._id.toString()
  }
  get userId(): UserId {
    return this.props.userId
  }
  get title(): string {
    return this.props.title
  }
  get message(): string {
    return this.props.message
  }
  get user(): User {
    return this.props.user
  }

  get type(): string {
    return this.props.type
  }

  constructor(userProps: NotificationProps, id?: UniqueEntityID) {
    super(userProps, id)
  }

  public static create(props: NotificationProps, id?: UniqueEntityID): Result<Notification> {
    const guardResult = Guard.againstNullOrUndefinedBulk([{ argument: props.message, argumentName: "message" }])
    if (!guardResult.succeeded) {
      return Result.fail<Notification>(guardResult.message || "")
    }

    const notification = new Notification(
      {
        ...props,
      },
      id,
    )

    const isNewNotification = !id

    if (isNewNotification) {
      notification.addDomainEvent(new NotificationCreated(notification))
    }

    return Result.ok<Notification>(notification)
  }
}
