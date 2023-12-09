/**
 * Only concerns number-like strings
 */
export const toNumber = <T = undefined>(
  val: any,
  fallback?: T
): number | T => {
  const n = Number(val)
  return Number.isNaN(n) ? fallback as T : n
}
