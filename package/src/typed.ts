import type { DefinitelyArray, DefinitelyFunction, PlainObject, Primitive } from './models'
import { StandardObject } from './models'

export const toTypeString = (value: unknown): string => {
  return Object.prototype.toString.call(value)
}

/**
 * extract "RawType" from strings like "[object RawType]"
 */
export const toRawType = (val: unknown): string => {
  return toTypeString(val).slice(8, -1)
}

export const hasOwn = <T extends Record<PropertyKey, any>, K extends PropertyKey>(
  val: T,
  key: K
): key is K => val.hasOwn(val, key)

export const isPrimitive = (value: unknown): value is Primitive => {
  return Object(value) !== value
}

export const isDef = <T>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null
}

export const isNil = <T>(val: T): val is Extract<T, null | undefined> => {
  return val == null
}

export const notNull = <T>(val: T): val is Exclude<T, null> => {
  return val !== null
}

export const isNull = <T>(val: T): val is Extract<T, null> => {
  return val === null
}

export const isUndefined = <T>(val: T): val is Extract<T, undefined> => {
  return val === undefined
}

export const notUndefined = <T>(val: T): val is Exclude<T, undefined> => {
  return val !== undefined
}

export const isTruthy = <T>(val: T): val is NonNullable<T> => {
  return Boolean(val)
}

export const isBoolean = (val: unknown): val is boolean => {
  return typeof val === 'boolean'
}

export const isArray = <T>(val: T | ReadonlyArray<unknown>): val is DefinitelyArray<T> => {
  return Array.isArray(val)
}

export const isDate = (val: unknown): val is Date => {
  return toTypeString(val) === StandardObject.Date
}

export const isRegex = (val: unknown): val is RegExp => {
  return toTypeString(val) === StandardObject.RegExp
}

export const isFunction = <T> (val: T | Function): val is DefinitelyFunction<T> => {
  return typeof val === 'function'
}

export const isString = (val: unknown): val is string => {
  return typeof val === 'string'
}

export const isInt = (val: unknown): val is number => {
  return isNumber(val) && Number.isInteger(val)
}

export const isFloat = (val: unknown): val is number => {
  return isNumber(val) && !Number.isInteger(val)
}

export const isNumber = (val: unknown): val is number => {
  try {
    return Number(val) === val
  } catch {
    return false
  }
}

export const isSymbol = (val: unknown): val is symbol => {
  return typeof val === 'symbol'
}

export const isObject = (val: unknown): val is object => {
  return toTypeString(val) === StandardObject.Object
}

export const isPlainObject = (val: unknown): val is PlainObject => {
  return !!val && toTypeString(val) === StandardObject.Object && val?.constructor === Object
}

export const isMap = (val: unknown): val is Map<any, any> => {
  return toTypeString(val) === StandardObject.Map
}

export const isSet = (val: unknown): val is Set<any> => {
  return toTypeString(val) === StandardObject.Set
}

export const isError = (val: unknown): val is Error => {
  return val instanceof Error
}

export const isPromise = <T, S>(val: Promise<T> | S): val is Promise<T> => {
  return val instanceof Promise
}

export const typeOf = (val: any) => {
  if (val === null) {
    return 'null'
  }

  if (val !== Object(val)) {
    return typeof val
  }

  const result = toRawType(val).toLowerCase()

  // strip function adornments (e.g. "AsyncFunction")
  return result.includes('function') ? 'function' : result
}

export const isWindow = (val: any): boolean => {
  // @ts-ignore
  return typeof window !== 'undefined' && toTypeString(val) === StandardObject.Window
}

// @ts-ignore
export const isBrowser = typeof window !== 'undefined'

export const noop = () => {}
