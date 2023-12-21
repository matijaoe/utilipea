import { isArray, isFunction, isMap, isNil, isObjectType, isSet, isString } from '..'

/**
 * Check if value is empty.
 *
 * Numbers, booleans, symbols, dates, regular expression, null and undefined are always considered empty.
 *
 * @category Collection
 *
 * @example
 * isEmpty([])            // true
 * isEmpty({})            // true
 * isEmpty("")            // true
 * isEmpty(new Map())     // true
 * isEmpty(new Set())     // true
 *
 * isEmpty(null)          // true
 * isEmpty(undefined)     // true
 * isEmpty(0)             // true
 * isEmpty(1)             // true
 * isEmpty(true)          // true
 * isEmpty(Symbol('foo')) // true
 * isEmpty(new Date())    // true
 * isEmpty(/foo/)         // true
 *
 * isEmpty([1, 2, 3])     // false
 * isEmpty('foo')         // false
 * isEmpty({ a: 1 })      // false
 */
export const isEmpty = (val: unknown, opts?: { includeSymbols: boolean }) => {
  if (isNil(val)) {
    return true
  }

  if (isString(val) || isArray(val)) {
    return val.length === 0
  }

  if (isMap(val) || isSet(val)) {
    return val.size === 0
  }

  if (ArrayBuffer.isView(val)) {
    return val.byteLength === 0
  }

  if (isObjectType(val) || isFunction(val)) {
    if (opts?.includeSymbols) {
      return Reflect.ownKeys(val).length === 0
    }
    return Object.keys(val!).length === 0
  }

  return true
}
