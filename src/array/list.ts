import { isFunction, isUndefined } from '../typed'

type Mapper<T = number> = (i: number) => T

type RangeOptions1<T = number> = {
  start?: number
  end: number
  step?: number
  fill?: T
}

type RangeOptions2<T = number> = {
  start?: number
  len: number
  step?: number
  fill?: T
}

function list<T = number>(len: number): T[]
function list<T = number>(start: number, end: number, step?: number, mapperOrValue?: Mapper<T> | T): T[]
function list<T = number>(start: number, len?: number, step?: number, mapperOrValue?: Mapper<T> | T): T[]
function list<T = number>(opts: RangeOptions1<T>): T[]
function list<T = number>(opts: RangeOptions2<T>): T[]
function list<T = number>(firstArgument: number | RangeOptions1<T> | RangeOptions2<T>, end?: number, step: number = 1, mapperOrValue: Mapper<T> | T = (i: number) => i as T): T[] {
  let start: number
  let len: number
  let fill: T | undefined
  let mapper: Mapper<T> = (i: number) => i as T

  // step gives 1

  if (typeof firstArgument === 'number') {
    // eslint-disable-next-line prefer-rest-params
    const args = Object.values(arguments)
    if (args.length === 1) {
      start = 0
      len = firstArgument
    } else if (args.length >= 2) {
      start = firstArgument
    }
    start ??= 0
    len ??= end! - firstArgument + 1
    step ??= 1

    mapper = isFunction(mapperOrValue)
      ? mapperOrValue as Mapper<T>
      : () => mapperOrValue as T
  } else {
    fill = firstArgument.fill
    start = firstArgument.start ?? 0
    len = 'end' in firstArgument ? firstArgument.end - start + 1 : firstArgument.len
    step = firstArgument.step ?? step
  }

  return Array.from(
    { length: len },
    (_, i) => !isUndefined(fill) ? fill : mapper(start + i * step)
  )
}

export { list }

console.log(list(2, 10, 2))
console.log(list({ end: 4 }))
console.log(list({ len: 5 }))
console.log(list({ start: 1, len: 5 }))
console.log(list({ start: 1, end: 5 }))
console.log(list({ start: 2, end: 10, step: 2 }))
console.log(list({ start: 2, len: 10, step: 2 }))
