import { isFunction, isNumber, isUndefined } from '../typed'

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

function list<T = number>(opts: RangeOptions): T[]
function list<T = number>(len: number): T[]
function list<T = number>(start: number, end: number, step?: number, mapperOrValue?: Mapper<T> | T): T[]
function list<T = number>(firstArgument: number | RangeOptionsLen<T> | RangeOptionsEnd<T>, end?: number, step: number = 1, mapperOrValue: Mapper<T> | T = (i: number) => i as T): T[] {
  let start: number = 0
  let len: number
  let fill: T | undefined
  let mapper: Mapper<T> = (i: number) => i as T

  if (isNumber(firstArgument)) {
    // eslint-disable-next-line prefer-rest-params
    const argCount = Object.values(arguments).length

    if (argCount === 1) {
      len = firstArgument
    } else {
      start = firstArgument
      len = (end as number) - start + 1
    }

    mapper = isFunction(mapperOrValue) ? mapperOrValue : () => mapperOrValue
  } else {
    if (isFunction(firstArgument.fill)) {
      fill = undefined
      mapper = firstArgument.fill
    } else {
      fill = firstArgument.fill
    }
    start = firstArgument.start ?? 0
    len = 'end' in firstArgument
      ? firstArgument.end - start + 1
      : firstArgument.len

    step = firstArgument.step ?? 1
  }

  if (step !== 1) {
    len = Math.ceil(len / step)
  }

  return Array.from(
    { length: len },
    (_, i) => isUndefined(fill) ? mapper(start + i * step) : fill
  )
}

export { list }
