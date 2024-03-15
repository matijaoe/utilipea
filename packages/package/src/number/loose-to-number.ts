import { isNumber, isString } from '..'

/**
 * Convert a value to a number, using `parseFloat()`.
 *
 * If a number is passed, it is returned as is. 
 * If it's not a string, or results in `NaN` after conversion, fallback value is returned (`undefined` by default).
 * 
 * @example
 * looseToNumber('1')          // 1
 * looseToNumber('1.5')        // 1.5
 * looseToNumber('1.5.5')      // 1.5
 * looseToNumber('123foo', 0)  // 123
 * looseToNumber('foo', 'bar') // 'bar'
 * looseToNumber('')           // undefined
 * looseToNumber('', 0)        // 0
 */
export const looseToNumber = <T = undefined>(
  val: unknown,
  fallback?: T
): number | T => {
  if (isNumber(val)) { return val }
  const n = isString(val) ? Number.parseFloat(val) : Number.NaN
  return Number.isNaN(n) ? fallback as T : n
}
