"use strict";
// type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiValidate = exports.addDaysToDate = exports.isNullOrUndefined = exports.notEmpty = exports.isValidNumber = exports.isType = exports.isConstObjectType = exports.isValidEnumValue = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const isConstObjectType = (value, enumObject) => {
    return !!~Object.values(enumObject).indexOf(value);
};
exports.isConstObjectType = isConstObjectType;
const isValidEnumValue = (value, enumObject) => {
    return !!~Object.values(enumObject).indexOf(value);
};
exports.isValidEnumValue = isValidEnumValue;
const isConstArrayType = (value, typeArray) => typeArray.includes(value);
exports.isType = isConstArrayType;
const isValidNumber = (value) => {
    return typeof Number(value) === "number" && !isNaN(value);
};
exports.isValidNumber = isValidNumber;
/* Type Predicate for filtering out any undefined or null values  from arrays*/
function notEmpty(value) {
    return value !== null && value !== undefined;
}
exports.notEmpty = notEmpty;
function isNullOrUndefined(obj) {
    return typeof obj === "undefined" || obj === null;
}
exports.isNullOrUndefined = isNullOrUndefined;
function addDaysToDate(date, addedDays) {
    return (0, dayjs_1.default)(date).add(addedDays, "day").toDate();
}
exports.addDaysToDate = addDaysToDate;
function joiValidate(schema, data) {
    return schema.validate(data);
}
exports.joiValidate = joiValidate;
//# sourceMappingURL=typeUtils.js.map