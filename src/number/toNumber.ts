/**
 * Only concerns number-like strings
 */
export const toNumber = <T = undefined>(
  val: any,
  fallback?: T
): number | T | undefined => {
  const n = Number(val)
  return Number.isNaN(n) ? fallback : n
}
