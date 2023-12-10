import type { Falsy, PlainObject, Primitive } from './models'
import { StandardObject } from './models'

export const toTypeString = (value: unknown): string => {
  return Object.prototype.toString.call(value)
}

/**
 * extract "RawType" from strings like "[object RawType]"
 */
export const toRawType = (value: unknown): string => {
  return toTypeString(value).slice(8, -1)
}

export const hasOwn = <T extends Record<string | symbol, any>, K extends string | symbol>(
  val: T,
  key: K
): key is K => val.hasOwn(val, key)

export const isPrimitive = (value: unknown): value is Primitive => {
  return Object(value) !== value
}

export const isDef = <T>(val: T): val is NonNullable<T> => {
  return typeof val !== 'undefined' && val !== null
}

export const notNull = <T>(val: T): val is T => {
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
  return Boolean(val)
}

export const isBoolean = (data: unknown): data is boolean => {
  return typeof data === 'boolean'
}

type DefinitelyArray<T> = Extract<
  T,
  Array<any> | ReadonlyArray<any>
> extends never
  ? ReadonlyArray<unknown>
  : Extract<T, Array<any> | ReadonlyArray<any>>

export const isArray = <T>(
  data: T | ReadonlyArray<unknown>
): data is DefinitelyArray<T> => {
  return Array.isArray(data)
}

export const isDate = (val: unknown): val is Date => {
  return toTypeString(val) === StandardObject.Date
}

export const isRegex = (val: unknown): val is RegExp => {
  return toTypeString(val) === StandardObject.RegExp
}

type DefinitelyFunction<T> = Extract<T, Function> extends never
  ? Function
  : Extract<T, Function>
export const isFunction = <T> (val: T | Function): val is DefinitelyFunction<T> => {
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
