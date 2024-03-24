import { Entity } from "./Entity"
import { Events } from "./events/Events"
import { IEvent } from "./events/IEvent"
import { UniqueEntityID } from "./UniqueEntityID"

export abstract class CustomEvent<T> extends Entity<T> {
  private _events: IEvent[] = []

  get id(): UniqueEntityID {
    return this._id
  }

  get events(): IEvent[] {
    return this._events
  }

  protected addCustomEvent(event: IEvent): void {
    console.log("add event", event)
    // Add the domain event to this aggregate's list of domain events
    this._events.push(event)
    // Add this aggregate instance to the domain event's list of aggregates who's
    // events it eventually needs to dispatch.
    Events.markCustomEventForDispatch(this)
    console.log("add custom event", event.getEventId())

    this.dispatchEvent(event.getEventId())
    // Log the domain event
    this.logDomainEventAdded(event)
  }

  public clearEvents(): void {
    this._events.splice(0, this._events.length)
  }

  private logDomainEventAdded(event: IEvent): void {
    const thisClass = Reflect.getPrototypeOf(this)
    const eventClass = Reflect.getPrototypeOf(event)
    console.info(`[Custom Event Created]:`, thisClass.constructor.name, "==>", eventClass.constructor.name)
  }
  protected dispatchEvent(eventId: UniqueEntityID) {
    Events.dispatchEventsForAggregate(eventId)
  }
}
