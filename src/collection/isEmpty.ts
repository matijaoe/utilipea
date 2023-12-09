/* eslint-disable jsdoc/check-param-names */
import { isArray, isFunction, isMap, isNil, isSet, isString } from '..'

/**
 * Checks if a value is empty.
 *
 * Numbers, booleans, symbols, dates, regular expression, null and undefined are always considered empty.
 *
 * @example
 * isEmpty([])            // → true
 * isEmpty({})            // → true
 * isEmpty("")            // → true
 * isEmpty(new Map())     // → true
 * isEmpty(new Set())     // → true
 *
 * isEmpty(null)          // → true
 * isEmpty(undefined)     // → true
 * isEmpty(0)             // → true
 * isEmpty(1)             // → true
 * isEmpty(true)          // → true
 * isEmpty(Symbol('foo')) // → true
 * isEmpty(new Date())    // → true
 * isEmpty(/foo/)         // → true
 *
 * isEmpty([1, 2, 3])     // → false
 * isEmpty('foo')         // → false
 * isEmpty({ a: 1 })      // → false
 *
 * @param val Value to check
 * @param opts.includeSymbols If `true`, symbols will be considered when checking for empty objects
 * @returns Returns `true` if `value` is empty, else `false`
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

  if (typeof val === 'object' || isFunction(val)) {
    const keysLen = Object.keys(val as any).length
    if (opts?.includeSymbols) {
      const symbolsLen = Object.getOwnPropertySymbols(val as any).length
      return keysLen === 0 && symbolsLen === 0
    }
    return keysLen === 0
  }

  return true
}
