/**
 * Convert a value to a number, using `parseFloat()`.
 *
 * If the conversion fails, fallback value is returned. `undefined` by default.
 *
 * @example
 * toNumber('1') // 1
 * toNumber('1.5') // 1.5
 * toNumber('1.5.5') // 1.5
 * toNumber('123foo', 0) // 123
 * toNumber('foo', 'bar') // 'bar'
 */
export const looseToNumber = <T = undefined>(
  val: any,
  fallback?: T
): number | T => {
  const n = Number.parseFloat(val)
  return Number.isNaN(n) ? fallback as T : n
}
