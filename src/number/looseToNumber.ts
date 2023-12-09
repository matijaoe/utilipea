/**
 * "123-foo" will be parsed to 123
 */
export const looseToNumber = <T = undefined>(
  val: any,
  fallback?: T
): number | T | undefined => {
  const n = Number.parseFloat(val)
  return Number.isNaN(n) ? fallback : n
}
