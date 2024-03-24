/* eslint-disable no-prototype-builtins */
import { IDomainEvent } from "./IDomainEvent"
import { AggregateRoot } from "../AggregateRoot"
import { UniqueEntityID } from "../UniqueEntityID"

export type RegisterCallback = (event: IDomainEvent) => Promise<void>
export class DomainEvents {
  private static handlersMap = {}
  private static markedAggregates: AggregateRoot<any>[] = []

  /**
   * @method markAggregateForDispatch
   * @static
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */

  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id)

    if (!aggregateFound) {
      DomainEvents.markedAggregates.push(aggregate)
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: IDomainEvent) => this.dispatch(event))
  }

  private static removeAggregateFromMarkedDispatchList(aggregate: AggregateRoot<any>): void {
    const index = DomainEvents.markedAggregates.findIndex((a) => a.equals(aggregate))
    DomainEvents.markedAggregates.splice(index, 1)
  }

  private static findMarkedAggregateByID(id: UniqueEntityID): AggregateRoot<any> {
    let found: AggregateRoot<any> = null

    for (const aggregate of DomainEvents.markedAggregates) {
      if (aggregate.id.equals(id)) {
        found = aggregate
      }
    }

    return found
  }

  public static dispatchEventsForAggregate(id: UniqueEntityID): void {
    const aggregate = this.findMarkedAggregateByID(id)

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate)
      aggregate.clearEvents()
      this.removeAggregateFromMarkedDispatchList(aggregate)
    }
  }

  public static register(callback: (event: IDomainEvent) => void, eventClassName: string): void {
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
    DomainEvents.markedAggregates = []
  }

  private static dispatch(event: IDomainEvent): void {
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

  public static dispatchEventsHook(id: any) {
    console.log("DIspatch event machine learning...")
    const aggregateId = new UniqueEntityID(id)
    DomainEvents.dispatchEventsForAggregate(aggregateId)
  }
}
