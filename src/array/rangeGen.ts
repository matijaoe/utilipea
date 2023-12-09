import { isFunction } from '..'

// TODO: handle reverse
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
