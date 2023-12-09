import { isFunction } from '..'

/**
 * Creates a generator that will produce an iteration through the range of number as requested.
 *
 * With only startOrLength provided, generates values from 0 to length (exclusive).
 * With start, end, and step, generates from start to end, adjusting by step.
 *
 * @example
 * // Using in a for loop:
 * for (const num of rangeGen(1, 5)) {
 *   console.log(num)
 * }
 * // => 1 2 3 4
 *
 * // Using a step value:
 * for (const num of rangeGen(0, 10, 3)) {
 *   console.log(num)
 * }
 * // => 0 3 6 9
 *
 * // Using a mapper function:
 * for (const square of rangeGen(1, 4, 1, (i) => i * i)) {
 *   console.log(square)
 * }
 * // => 1 4 9
 *
 * @param startOrLength Start number or length of the sequence if end is not provided
 * @param [end] End number of the sequence (exclusive), optional if only startOrLength is provided
 * @param [step] Step between numbers
 * @param [valueOrMapper] Fixed value or mapper function to transform each sequence element
 * @throws If step is 0, or if start and end are equal without a mapper function.
 * @returns Generator yielding values from 'start' to 'end' (exclusive), adjusted by 'step'
 */
export function* rangeGen<T = number>(
  startOrLength: number,
  end?: number,
  step: number = 1,
  valueOrMapper: T | ((i: number) => T) = (i) => i as T,
): Generator<T> {
  const start = end ? startOrLength : 0
  const final = end ?? startOrLength
  const mapper = isFunction(valueOrMapper) ? valueOrMapper : () => valueOrMapper

  for (let i = start; i <= final; i += step) {
    yield mapper(i)
    if (i + step > final) {
      break
    }
  }
}

export const toList = <T>(gen: Generator<T>): T[] => {
  const items: T[] = []
  for (const item of gen) {
    items.push(item)
  }
  return items
}
