/* eslint-disable jsdoc/check-param-names */
import { isDefined } from '..'

/**
 * Creates an array from start to end (exclusive), stepping by step.
 * If start is larger than end, the array is generated in reverse
 *
 * @example
 * for (const num of range(1, 5)) {
 *   console.log(num);
 * }
 * // => 1 2 3 4
 *
 * // Array of numbers of length 5
 * range(0, 10, 2);
 * // => [0, 1, 2, 3, 4]
 *
 * // Array of even numbers between 0 and 10:
 * range(0, 10, 2);
 * // => [0, 2, 4, 6, 8]
 *
 * // Descending range with positive step:
 * range(5, 0, 2);
 * // => [5, 3, 1]
 *
 * // Descending range with negative step:
 * range(5, 0, -2);
 * // => [5, 3, 1]
 *
 * @param startOrLen Length, or start number of sequence
 * @param end End number of sequence
 * @param step Step between numbers, default: 1
 * @throws If range is negative or step is 0
 * @returns An array of numbers
 */
export function range(len: number): number[]
export function range(start: number, end: number, step?: number): number[]
export function range(startOrLen: number, end?: number, step = 1): number[] {
  const start = isDefined(end) ? startOrLen : 0
  const length = isDefined(end) ? Math.ceil(Math.abs((end - start) / step)) : startOrLen
  end ??= startOrLen - 1

  if (start === end) {
    return []
  }

  const isAsc = start < end

  if (isAsc && step < 0) {
    throw new Error('The step must be greater than 0.')
  }

  step = isAsc ? step : -Math.abs(step)

  const result = Array.from<number>({ length })

  for (let i = 0; i < length; i++) {
    result[i] = start + (i * step)
  }

  return result
}
