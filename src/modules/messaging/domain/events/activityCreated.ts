import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID"
import { IDomainEvent } from "../../../../core/domain/events/IDomainEvent"
import { Activity } from "../../../wallet/domain/activity"

export class ActivityCreated implements IDomainEvent {
  public dateTimeOccurred: Date
  public activity: Activity

  constructor(activity: Activity) {
    this.dateTimeOccurred = new Date()
    this.activity = activity
  }

  getAggregateId(): UniqueEntityID {
    return this.activity.id
  }
}
