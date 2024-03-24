import { User } from "./user"
import { UserId } from "./userId"
import { PropertyId } from "./propertyId"
import { Guard } from "../../../core/logic/Guard"
import { Result } from "../../../core/logic/Result"
import { AggregateRoot } from "../../../core/domain/AggregateRoot"
import { UniqueEntityID } from "../../../core/domain/UniqueEntityID"
import { PropertyInvestmentNotificationType } from "../../../infra/db/models/UserEntity"
import { PropertyInvestmentNotificationCreated } from "../../messaging/domain/events/propertyInvestmentNotificationCreated"

interface PropertyInvestmentNotificationProps {
  user: User
  title: string
  userId: UserId
  message: string
  propertyId: PropertyId
  type: PropertyInvestmentNotificationType
}

export class PropertyInvestmentNotification extends AggregateRoot<PropertyInvestmentNotificationProps> {
  get notificationId(): string {
    return this._id.toString()
  }
  get userId(): UserId {
    return this.props.userId
  }
  get title(): string {
    return this.props.title
  }
  get propertyId(): PropertyId {
    return this.props.propertyId
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

  constructor(userProps: PropertyInvestmentNotificationProps, id?: UniqueEntityID) {
    super(userProps, id)
  }

  public static create(props: PropertyInvestmentNotificationProps, id?: UniqueEntityID): Result<PropertyInvestmentNotification> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.message, argumentName: "message" },
      { argument: props.type, argumentName: "type" },
      { argument: props.title, argumentName: "title" },
    ])
    if (!guardResult.succeeded) {
      return Result.fail<PropertyInvestmentNotification>(guardResult.message || "")
    }

    const propertyInvestmentNotification = new PropertyInvestmentNotification(
      {
        ...props,
      },
      id,
    )

    const isNewNotification = !id

    if (isNewNotification) {
      propertyInvestmentNotification.addDomainEvent(new PropertyInvestmentNotificationCreated(propertyInvestmentNotification))
    }

    return Result.ok<PropertyInvestmentNotification>(propertyInvestmentNotification)
  }
}
