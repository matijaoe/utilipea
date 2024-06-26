import { isFunction, notUndefined } from '../typed'

type Mapper<T = number> = (i: number) => T

export type BaseRangeOptions<T = number> = {
  start?: number
  step?: number
  fill?: T
  map?: Mapper<T>
}

type RangeOptionsEnd<T = number> = BaseRangeOptions<T> & { end: number }
type RangeOptionsLen<T = number> = BaseRangeOptions<T> & { len: number }

type RangeOptions<T> = RangeOptionsEnd<T> | RangeOptionsLen<T>

/**
 * Generate a list of elements from start to end (inclusive).
 *
 * @category Array
 *
 * @example
 * list({ len: 3 }) // => [0, 1, 2]
 * list({ end: 3 }) // => [0, 1, 2, 3]
 * list({ start: 1, len: 5 }) // => [1, 2, 3, 4, 5]
 * list({ start: 1, end: 3 }) // => [1, 2, 3]
 * list({ start: 1, end: 3, step: 2 }) // => [1, 3]
 * list({ start: 1, end: 3, fill: 'a' }) // => ['a', 'a', 'a']
 * list({ start: 1, end: 3, map: (i) => i * i }) // => [1, 4, 9]
 * 
 * @see [utilipea.vercel.app/array/list.html](https://utilipea.vercel.app/array/list.html)
 * 
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
  const mapper = opts.map || ((i: number) => i as T)

  return Array.from(
    { length: len },
    (_, i) => notUndefined(fill) ? fill : mapper(start + i * step)
  )
}
