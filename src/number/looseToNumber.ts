/**
 * "123-foo" will be parsed to 123
 */
export const looseToNumber = <T = undefined>(
  val: any,
  fallback?: T
): number | T => {
  const n = Number.parseFloat(val)
  return Number.isNaN(n) ? fallback as T : n
}
