"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapper = void 0;
class Mapper {
    static serializeObj(obj) {
        return JSON.stringify(obj);
    }
    static deserializeObj(data) {
        return JSON.parse(data);
    }
}
exports.Mapper = Mapper;
//# sourceMappingURL=Mapper.js.map