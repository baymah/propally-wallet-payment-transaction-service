import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID"
import { IDomainEvent } from "../../../../core/domain/events/IDomainEvent"
import { PropertyInvestmentNotification } from "../../../payment/domain/propertyInvestmentNotification"

export class PropertyInvestmentNotificationCreated implements IDomainEvent {
  public dateTimeOccurred: Date
  public propertyInvestmentNotification: PropertyInvestmentNotification

  constructor(propertyInvestmentNotification: PropertyInvestmentNotification) {
    this.dateTimeOccurred = new Date()
    this.propertyInvestmentNotification = propertyInvestmentNotification
  }

  getAggregateId(): UniqueEntityID {
    return this.propertyInvestmentNotification.id
  }
}
