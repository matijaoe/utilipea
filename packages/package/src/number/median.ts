import { sort } from '..'
import { isOdd } from './isOdd'

/**
 * Calculate the median of an array of numbers
 *
 * Returns `undefined` if the input array is empty.
 * @example
 * median([1, 2, 3, 4, 5]) // => 3
 * median([1, 2, 3, 4, 5, 6]) // => 3.5
 */

export const median = (numbers: readonly number[]) => {
  if (numbers.length === 0) { return undefined }

  const s = sort(numbers)
  const mid = Math.floor(s.length / 2)

  return isOdd(s.length) ? s[mid] : (s[mid - 1]! + s[mid]) / 2
}
