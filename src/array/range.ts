/* eslint-disable jsdoc/check-param-names */
import { isDefined } from '..'

/**
 * Creates an array from start to end (exclusive), incrementing by step.
 *
 * When only a single argument is provided, it generates an array from 0 to length (exclusive).
 * Otherwise, it generates an array from start to end, adjusting by step.
 *
 * If start is greater than end, the array is generated in reverse, decrementing by step.
 *
 * @example
 * // Using range in a for loop:
 * for (const num of range(1, 5)) {
 *   console.log(num)
 * }
 * // => 1 2 3 4
 *
 * // Array of numbers from 0 to 4:
 * range(5);
 * // [0, 1, 2, 3, 4]
 *
 * // Array of even numbers between 0 and 10:
 * range(0, 10, 2);
 * // [0, 2, 4, 6, 8]
 *
 * // Descending range with negative step:
 * range(5, 0, -2);
 * // [5, 3, 1]
 *
 *
 * @param startOrLen The start number of the sequence, or the length of the sequence if only one argument is provided.
 * @param [end] The end number of the sequence (exclusive)
 * @param [step] Step between numbers.
 * @throws If step is 0, positive for a descending range, or negative for an ascending range.
 * @returns An array of numbers from 'start' to 'end' (exclusive), adjusted by 'step'.
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
