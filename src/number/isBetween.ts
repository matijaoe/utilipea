/**
 * Check if value is between min and max (inclusive).
 *
 * @category Number
 *
 * @example
 * isBetween(3, [1, 5]) // true
 * isBetween(5, [1, 5]) // true
 * isBetween(7, [1, 5]) // false
 */
export const isBetween = (val: number, [min, max]: [number, number]) => {
  return val >= min && val <= max
}
