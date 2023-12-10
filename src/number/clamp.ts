/**
 * Clamp a number between a minimum and maximum value.
 *
 * @category Number
 *
 * @example
 * clamp(3, 1, 5) // 3
 * clamp(0, 1, 5) // 1
 * clamp(7, 1, 5) // 5
 * clamp(3, 5, 1) // 3
 */
export const clamp = (n: number, min: number, max: number) => {
  if (max < min) {
    throw new Error('max must be greater than min')
  }
  return Math.min(max, Math.max(min, n))
}
