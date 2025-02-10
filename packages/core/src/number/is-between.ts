import { isArray } from '..'

/**
 * Check if value is between min and max (inclusive).
 *
 * @category Number
 *
 * @example
 *
 * isBetween(3, [1, 5]) // true
 * isBetween(5, [1, 5]) // true
 * isBetween(7, [1, 5]) // false
 *
 * isBetween(3, { min: 1, max: 5 }) // true
 * isBetween(5, { min: 1, max: 5 }) // true
 * isBetween(7, { min: 1, max: 5 }) // false
 */
export function isBetween(val: number, range: { min: number, max: number }): boolean
export function isBetween(val: number, range: [number, number]): boolean
export function isBetween(val: number, range: { min: number, max: number } | [number, number]): boolean {
  let min: number, max: number
  if (isArray(range)) {
    [min, max] = range
  } else {
    ({ min, max } = range)
  }
  return val >= min && val <= max
}
