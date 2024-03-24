"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomEvent = void 0;
const Entity_1 = require("./Entity");
const Events_1 = require("./events/Events");
class CustomEvent extends Entity_1.Entity {
    constructor() {
        super(...arguments);
        this._events = [];
    }
    get id() {
        return this._id;
    }
    get events() {
        return this._events;
    }
    addCustomEvent(event) {
        console.log("add event", event);
        // Add the domain event to this aggregate's list of domain events
        this._events.push(event);
        // Add this aggregate instance to the domain event's list of aggregates who's
        // events it eventually needs to dispatch.
        Events_1.Events.markCustomEventForDispatch(this);
        console.log("add custom event", event.getEventId());
        this.dispatchEvent(event.getEventId());
        // Log the domain event
        this.logDomainEventAdded(event);
    }
    clearEvents() {
        this._events.splice(0, this._events.length);
    }
    logDomainEventAdded(event) {
        const thisClass = Reflect.getPrototypeOf(this);
        const eventClass = Reflect.getPrototypeOf(event);
        console.info(`[Custom Event Created]:`, thisClass.constructor.name, "==>", eventClass.constructor.name);
    }
    dispatchEvent(eventId) {
        Events_1.Events.dispatchEventsForAggregate(eventId);
    }
}
exports.CustomEvent = CustomEvent;
//# sourceMappingURL=CustomEvent.js.map