import { isFunction, isUndefined } from '../typed'

type Mapper<T = number> = (i: number) => T

type BaseRangeOptions<T = number> = {
  start?: number
  step?: number
  fill?: T | Mapper<T>
}

type RangeOptionsEnd<T = number> = BaseRangeOptions<T> & {
  end: number
}

type RangeOptionsLen<T = number> = BaseRangeOptions<T> & {
  len: number
}

type RangeOptions<T> = RangeOptionsEnd<T> | RangeOptionsLen<T>

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
