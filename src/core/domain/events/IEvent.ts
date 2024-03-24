import { UniqueEntityID } from "../UniqueEntityID"

export interface IEvent {
  dateTimeOccurred: Date
  getEventId(): UniqueEntityID
}
