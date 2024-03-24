/* eslint-disable no-prototype-builtins */
import { CustomEvent } from "../CustomEvent"
import { UniqueEntityID } from "../UniqueEntityID"
import { IEvent } from "./IEvent"

export class Events {
  private static handlersMap = {}
  private static markedCustomEvents: CustomEvent<any>[] = []

  /**
   * @method markCustomEventForDispatch
   * @static
   * @desc Called by event root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */

  public static markCustomEventForDispatch(event: CustomEvent<any>): void {
    console.log("Event", event)
    const eventFound = !!this.findMarkedAggregateByID(event.id)

    if (!eventFound) {
      Events.markedCustomEvents.push(event)
    }
  }

  private static dispatchAggregateEvents(event: CustomEvent<any>): void {
    event.events.forEach((event: IEvent) => this.dispatch(event))
  }

  private static removeAggregateFromMarkedDispatchList(event: CustomEvent<any>): void {
    const index = Events.markedCustomEvents.findIndex((a) => a.equals(event))
    Events.markedCustomEvents.splice(index, 1)
  }

  private static findMarkedAggregateByID(id: UniqueEntityID): CustomEvent<any> {
    let found: CustomEvent<any> = null
    console.log("all events", Events.markedCustomEvents)
    for (const event of Events.markedCustomEvents) {
      if (event.id.equals(id)) {
        found = event
      }
    }

    return found
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID): void {
    const event = this.findMarkedAggregateByID(id)

    if (event) {
      console.log("event dispatched")
      this.dispatchAggregateEvents(event)
      event.clearEvents()
      this.removeAggregateFromMarkedDispatchList(event)
    }
    console.log("event not found")
  }

  public static register(callback: (event: IEvent) => void, eventClassName: string): void {
    if (!this.handlersMap.hasOwnProperty(eventClassName)) {
      this.handlersMap[eventClassName] = []
    }
    this.handlersMap[eventClassName].push(callback)

    // create rabbitmq channel
    //   conn.createChannel(function (err, channel) {
    //     ch = channel;
    // });
  }

  public static clearHandlers(): void {
    this.handlersMap = {}
  }

  public static clearMarkedAggregates(): void {
    Events.markedCustomEvents = []
  }

  private static dispatch(event: IEvent): void {
    console.log("an event has actually been dispatched on dispatch(")

    const eventClassName: string = event.constructor.name

    if (this.handlersMap.hasOwnProperty(eventClassName)) {
      const handlers: any[] = this.handlersMap[eventClassName]

      for (const handler of handlers) {
        handler(event)
      }
    }

    //  ch.sendToQueue(queueName, new Buffer(data), {persistent: true});
  }
}
