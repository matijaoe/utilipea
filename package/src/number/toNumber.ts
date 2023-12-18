/**
 * Convert a value to a number, using `Number()`.
 *
 * If the conversion fails, fallback value is returned. `undefined` by default.
 *
 * @example
 * toNumber('1') // 1
 * toNumber('1.5') // 1.5
 * toNumber('1.5.5') // undefined
 * toNumber('123foo', 0) // 0
 * toNumber('foo', 'bar') // 'bar'
 */
export const toNumber = <T = undefined>(
  val: any,
  fallback?: T
): number | T => {
  const n = Number(val)
  return Number.isNaN(n) ? fallback as T : n
}
