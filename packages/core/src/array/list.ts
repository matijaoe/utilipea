import { isFunction, notUndefined } from '../typed'

export type BaseRangeOptions<T = number> = {
  start?: number
  step?: number
  fill?: T
  map?: (i: number) => T
}

export function list<T = number>(opts: BaseRangeOptions<T> & { end: number }): T[]
export function list<T = number>(opts: BaseRangeOptions<T> & { len: number }): T[]
export function list<T = number>(
  opts: BaseRangeOptions<T> & ({ end: number } | { len: number })
): T[] {
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
