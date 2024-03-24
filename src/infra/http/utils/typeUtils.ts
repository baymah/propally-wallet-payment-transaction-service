// type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };

import dayjs from "dayjs"
import Joi from "joi"

const isConstObjectType = <T>(value: any, enumObject: Record<string, T>): value is T => {
  return !!~Object.values(enumObject).indexOf(value)
}

const isValidEnumValue = (value: any, enumObject: any): boolean => {
  return !!~Object.values(enumObject).indexOf(value)
}

const isConstArrayType = <T>(value: any, typeArray: ReadonlyArray<T>): value is T => typeArray.includes(value)

const isValidNumber = (value: any): value is number => {
  return typeof Number(value) === "number" && !isNaN(value)
}

/* Type Predicate for filtering out any undefined or null values  from arrays*/
function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

function isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
  return typeof obj === "undefined" || obj === null
}

function addDaysToDate(date: Date, addedDays: number): Date {
  return dayjs(date).add(addedDays, "day").toDate()
}

function joiValidate<T>(schema: any, data: any): { error: Joi.ValidationError | undefined; value: T } {
  return schema.validate(data)
}

export { isValidEnumValue, isConstObjectType, isConstArrayType as isType, isValidNumber, notEmpty, isNullOrUndefined, addDaysToDate, joiValidate }
