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

export const isPrimitive = (value: any): boolean => {
  return (
    value === undefined
    || value === null
    || (typeof value !== 'object' && typeof value !== 'function')
  )
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

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return (
    (isObject(val) || isFunction(val))
    && isFunction((val as any).then)
    && isFunction((val as any).catch)
  )
}
