import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID"
import { IDomainEvent } from "../../../../core/domain/events/IDomainEvent"
import { Notification } from "../../../payment/domain/notification"

export class NotificationCreated implements IDomainEvent {
  public dateTimeOccurred: Date
  public notification: Notification

  constructor(notification: Notification) {
    this.dateTimeOccurred = new Date()
    this.notification = notification
  }

  getAggregateId(): UniqueEntityID {
    return this.notification.id
  }
}
