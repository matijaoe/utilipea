import { isFunction, isUndefined } from '../typed'

type Mapper<T = number> = (i: number) => T

type BaseRangeOptions<T = number> = {
  start?: number
  step?: number
  fill?: T | Mapper<T>
}

type RangeOptionsEnd<T = number> = BaseRangeOptions<T> & { end: number }
type RangeOptionsLen<T = number> = BaseRangeOptions<T> & { len: number }

type RangeOptions<T> = RangeOptionsEnd<T> | RangeOptionsLen<T>

/**
 * Generates a list of elements from start to end (inclusive), incrementing by step.
 *
 * @example
 * range({ len: 3 }) // [0, 1, 2]
 * range({ end: 3 }) // [0, 1, 2, 3]
 * range({ start: 1, len: 5 }) // [1, 2, 3, 4, 5]
 * range({ start: 1, end: 3 }) // [1, 2, 3]
 * range({ start: 1, end: 3, step: 2 }) // [1, 3]
 * range({ start: 1, end: 3, fill: 'a' }) // ['a', 'a', 'a']
 * range({ start: 1, end: 3, fill: (i) => i * i }) // [1, 4, 9]
 *
 * @param opts - Range options for generating the list
 * @returns An array of values based on the
 * @throws Error if the step is less than or equal to 0.
 * @template T - The type of values in the list.
 */
export const list = <T = number>(opts: RangeOptions<T>): T[] => {
  const step = opts.step || 1

  if (step <= 0) {
    throw new Error('The step must be greater than 0.')
  }

  const start = opts.start ?? 0
  let len = 'end' in opts ? opts.end - start + 1 : opts.len

  if (step !== 1) {
    len = Math.ceil(len / step)
  }

  const fill = isFunction(opts.fill) ? undefined : opts.fill
  const mapper = isFunction(opts.fill) ? opts.fill : (i: number) => i as T

  return Array.from(
    { length: len },
    (_, i) => !isUndefined(fill)
      ? fill
      : mapper(start + i * step)
  )
}
