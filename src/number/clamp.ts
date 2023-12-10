import { isArray } from '..'

/**
 * Clamp a number between a minimum and maximum value.
 *
 * @category Number
 *
 * @example
 * clamp(3, { min: 1, max: 5 }) // 3
 * clamp(0, { min: 1, max: 5 }) // 1
 * clamp(7, { min: 1, max: 5 }) // 5
 * clamp(0, { min: 1 }) // 1
 * clamp(2, { max: 1 }) // 1
 *
 * clamp(3, [1, 5]) // 3
 * clamp(0, [1, 5]) // 1
 * clamp(7, [1, 5]) // 5
 */
export function clamp(val: number, range: { min: number; max?: number } | { min?: number; max: number }): number
export function clamp(val: number, range: [number, number]): number
export function clamp(val: number, range: { min: number; max?: number } | { min?: number; max: number } | [number, number]): number {
  let min: number, max: number

  if (isArray(range)) {
    [min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY] = range
  } else {
    ({ min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY } = range)
  }

  if (min > max) {
    throw new Error('max must be greater than min')
  }

  return Math.min(max, Math.max(min, val))
}
