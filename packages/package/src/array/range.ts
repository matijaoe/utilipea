/**
 * Generate an array of numbers, from start to end (exclusive), incrementing by step.
 *
 * If only a single argument is provided, it generates an array from 0 to length (exclusive).
 *
 * If start is greater than end, the array is generated in reverse, decrementing by step.
 *
 * @category Array
 *
 * @example
 * // Usage with for...of:
 * for (const num of range(1, 5)) {
 *   console.log(num)
 * }
 * // => 1 2 3 4
 *
 * // Numbers from 0 to 4:
 * range(5)
 * // => [0, 1, 2, 3, 4]
 *
 * // Even numbers between 0 and 10:
 * range(0, 10, 2)
 * // => [0, 2, 4, 6, 8]
 *
 * // Descending range with negative step:
 * range(5, 0, -2)
 * // => [5, 3, 1]
 *
 * // Descending range with positive step:
 * range(5, 0, 2)
 * // => [5, 3, 1]
 * 
 * @see [utilipea.vercel.app/array/range.html](https://utilipea.vercel.app/array/range.html)
 * 
 */
export function range(len: number): number[]
export function range(start: number, end: number, step?: number): number[]
export function range(...args: [number] | [number, number, number?]): number[] {
  let start: number, end: number, step: number, length: number

  if (args.length === 1) {
    [length] = args
    start = 0
    step = 1
    end = length - 1
  } else {
    [start, end, step = 1] = args
    length = Math.ceil(Math.abs((end - start) / step))
  }

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
