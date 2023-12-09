/**
 * Converts a value to a number, using `Number()`.
 *
 * @example
 * toNumber('1') // 1
 * toNumber('1.5') // 1.5
 * toNumber('1.5.5') // undefined
 * toNumber('123foo', 0) // 0
 * toNumber('foo', 'bar') // 'bar'
 *
 * @param val - Value to convert
 * @param [fallback] - Fallback value to return if the conversion fails. `undefined` by default
 * @returns The converted number or the fallback value if the conversion fails
 * @template T - Type of the fallback value
 */
export const toNumber = <T = undefined>(
  val: any,
  fallback?: T
): number | T => {
  const n = Number(val)
  return Number.isNaN(n) ? fallback as T : n
}
