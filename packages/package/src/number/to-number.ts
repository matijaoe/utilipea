import { isNumber, isString } from '..'

/**
 * Convert a value to a number, using `Number()`. Empty string returns fallback value, instead of `0`.
 *
 * If a number is passed, it is returned as is. 
 * If it's not a string, or results in `NaN` after conversion, fallback value is returned (`undefined` by default).
 * 
 * @example
 * toNumber('1')          // 1
 * toNumber('1.5')        // 1.5
 * toNumber('1.5.5')      // undefined
 * toNumber('123foo', 0)  // 0
 * toNumber('foo', 'bar') // 'bar'
 * toNumber('')           // undefined
 * toNumber('', 0)        // 0
 */
export const toNumber = <T = undefined>(
  val: unknown,
  fallback?: T
): number | T => {
  if (isNumber(val)) { return val }
  if (isString(val) && val.trim() === '') { return fallback as T }
  const n = isString(val) ? Number(val) : Number.NaN
  return Number.isNaN(n) ? fallback as T : n
}
