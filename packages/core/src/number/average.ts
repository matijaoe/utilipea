/**
 * Calculates the average of an array of numbers
 *
 * Returns `NaN` if the input array is empty.
 * @example
 * average([1, 2, 3, 4, 5]) // => 3
 *
 * @param numbers The input array of numbers
 * @returns The average of the input array, or NaN if the input array is empty
 */

import { sum } from '..'

export const average = (numbers: readonly number[]) => {
  if (numbers.length === 0) {
    return Number.NaN
  }
  return sum(numbers) / numbers.length
}
