"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvents = void 0;
class DomainEvents {
    /**
     * @method markAggregateForDispatch
     * @static
     * @desc Called by aggregate root objects that have created domain
     * events to eventually be dispatched when the infrastructure commits
     * the unit of work.
     */
    static markAggregateForDispatch(aggregate) {
        const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);
        if (!aggregateFound) {
            DomainEvents.markedAggregates.push(aggregate);
        }
    }
    static dispatchAggregateEvents(aggregate) {
        aggregate.domainEvents.forEach((event) => this.dispatch(event));
    }
    static removeAggregateFromMarkedDispatchList(aggregate) {
        const index = DomainEvents.markedAggregates.findIndex((a) => a.equals(aggregate));
        DomainEvents.markedAggregates.splice(index, 1);
    }
    static findMarkedAggregateByID(id) {
        let found = null;
        for (const aggregate of DomainEvents.markedAggregates) {
            if (aggregate.id.equals(id)) {
                found = aggregate;
            }
        }
        return found;
    }
    static dispatchEventsForAggregate(id) {
        const aggregate = this.findMarkedAggregateByID(id);
        if (aggregate) {
            this.dispatchAggregateEvents(aggregate);
            aggregate.clearEvents();
            this.removeAggregateFromMarkedDispatchList(aggregate);
        }
    }
    static register(callback, eventClassName) {
        if (!this.handlersMap.hasOwnProperty(eventClassName)) {
            this.handlersMap[eventClassName] = [];
        }
        this.handlersMap[eventClassName].push(callback);
        // create rabbitmq channel
        //   conn.createChannel(function (err, channel) {
        //     ch = channel;
        // });
    }
    static clearHandlers() {
        this.handlersMap = {};
    }
    static clearMarkedAggregates() {
        DomainEvents.markedAggregates = [];
    }
    static dispatch(event) {
        console.log("an event has actually been dispatched on dispatch(");
        const eventClassName = event.constructor.name;
        if (this.handlersMap.hasOwnProperty(eventClassName)) {
            const handlers = this.handlersMap[eventClassName];
            for (const handler of handlers) {
                handler(event);
            }
        }
        //  ch.sendToQueue(queueName, new Buffer(data), {persistent: true});
    }
}
exports.DomainEvents = DomainEvents;
DomainEvents.handlersMap = {};
DomainEvents.markedAggregates = [];
//# sourceMappingURL=DomainEvents.js.map