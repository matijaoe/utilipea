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
 */
export const clamp = (val: number, { min, max }: { min: number; max?: number } | { min?: number; max: number }) => {
  min ??= Number.NEGATIVE_INFINITY
  max ??= Number.POSITIVE_INFINITY

  if (min > max) {
    throw new Error('max must be greater than min')
  }

  return Math.min(max, Math.max(min, val))
}
