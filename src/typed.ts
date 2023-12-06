import type { Falsy, Primitive } from './models'
import { StandardObject } from './models'

const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string => {
  return objectToString.call(value)
}

/**
 * extract "RawType" from strings like "[object RawType]"
 */
export const toRawType = (value: unknown): string => {
  return toTypeString(value).slice(8, -1)
}

const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key)

export const isPrimitive = (value: unknown): value is Primitive => {
  return Object(value) !== value
}

export const isDefined = <T>(val: T): val is NonNullable<T> => {
  return typeof val !== 'undefined' && val !== null
}

export const isNonNull = <T>(val: T): val is T => {
  return val !== null
}

export const isNil = <T>(val: T): val is Extract<T, null | undefined> => {
  return val == null
}

export const isNull = <T>(val: T): val is Extract<T, null> => {
  return val === null
}

export const isUndefined = <T>(val: T): val is Extract<T, undefined> => {
  return typeof val === 'undefined'
}

export const isTruthy = <T>(val: T): val is Exclude<T, Falsy> => {
  return !!val
}

export const isBoolean = (data: unknown): data is boolean => {
  return typeof data === 'boolean'
}

export const isArray = Array.isArray

export const isDate = (val: unknown): val is Date => {
  return toTypeString(val) === StandardObject.Date
}

export const isRegExp = (val: unknown): val is RegExp => {
  return toTypeString(val) === StandardObject.RegExp
}

export const isFunction = (val: unknown): val is Function => {
  return typeof val === 'function'
}

export const isString = (val: unknown): val is string => {
  return typeof val === 'string'
}

export const isInt = (value: unknown): value is number => {
  return isNumber(value) && value % 1 === 0
}

export const isFloat = (value: unknown): value is number => {
  return isNumber(value) && value % 1 !== 0
}

export const isNumber = (value: unknown): value is number => {
  try {
    return Number(value) === value
  } catch {
    return false
  }
}

export const isSymbol = (val: unknown): val is symbol => {
  return typeof val === 'symbol'
}

export const isObject = (val: unknown): val is Record<any, any> => {
  return val !== null && typeof val === 'object'
}

export const isPlainObject = (val: unknown): val is object => {
  return toTypeString(val) === StandardObject.Object
}

export const isMap = (val: unknown): val is Map<any, any> => {
  return toTypeString(val) === StandardObject.Map
}

export const isSet = (val: unknown): val is Set<any> => {
  return toTypeString(val) === StandardObject.Set
}

export const isWeakMap = (val: unknown): val is WeakMap<any, any> => {
  return toTypeString(val) === StandardObject.WeakMap
}

export const isWeakSet = (val: unknown): val is WeakSet<any> => {
  return toTypeString(val) === StandardObject.WeakSet
}

export const isError = (val: unknown): val is Error => {
  return val instanceof Error
}

export const isPromise = <T, S>(val: Promise<T> | S): val is Promise<T> => {
  return val instanceof Promise
}

export const isEmpty = (val: unknown) => {
  if (val === true || val === false) {
    return true
  }
  if (val === null || val === undefined) {
    return true
  }
  if (isNumber(val)) {
    return val === 0
  }
  if (isDate(val)) {
    return Number.isNaN(val.getTime())
  }
  if (isFunction(val)) {
    return false
  }
  if (isSymbol(val)) {
    return false
  }

  const length = (val as any)?.length
  if (isNumber(length)) {
    return length === 0
  }

  const size = (val as any)?.size
  if (isNumber(size)) {
    return size === 0
  }

  const keys = Object.keys(val).length

  return keys === 0
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
