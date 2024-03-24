"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identifier = void 0;
class Identifier {
    constructor(value) {
        this.value = value;
        this.value = value;
    }
    equals(id) {
        if (id == null || id == undefined) {
            console.log("Identifier Null or Undefined");
            return false;
        }
        // if(!(id instanceof this.constructor)){
        //     console.log('FAlse');
        //     return false
        // }
        return id.toValue() == this.value;
    }
    toString() {
        return String(this.value);
    }
    toValue() {
        return this.value;
    }
}
exports.Identifier = Identifier;
//# sourceMappingURL=Identifier.js.map