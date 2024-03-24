"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
class Events {
    /**
     * @method markCustomEventForDispatch
     * @static
     * @desc Called by event root objects that have created domain
     * events to eventually be dispatched when the infrastructure commits
     * the unit of work.
     */
    static markCustomEventForDispatch(event) {
        console.log("Event", event);
        const eventFound = !!this.findMarkedAggregateByID(event.id);
        if (!eventFound) {
            Events.markedCustomEvents.push(event);
        }
    }
    static dispatchAggregateEvents(event) {
        event.events.forEach((event) => this.dispatch(event));
    }
    static removeAggregateFromMarkedDispatchList(event) {
        const index = Events.markedCustomEvents.findIndex((a) => a.equals(event));
        Events.markedCustomEvents.splice(index, 1);
    }
    static findMarkedAggregateByID(id) {
        let found = null;
        console.log("all events", Events.markedCustomEvents);
        for (const event of Events.markedCustomEvents) {
            if (event.id.equals(id)) {
                found = event;
            }
        }
        return found;
    }
    static dispatchEventsForAggregate(id) {
        const event = this.findMarkedAggregateByID(id);
        if (event) {
            console.log("event dispatched");
            this.dispatchAggregateEvents(event);
            event.clearEvents();
            this.removeAggregateFromMarkedDispatchList(event);
        }
        console.log("event not found");
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
        Events.markedCustomEvents = [];
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
exports.Events = Events;
Events.handlersMap = {};
Events.markedCustomEvents = [];
//# sourceMappingURL=Events.js.map