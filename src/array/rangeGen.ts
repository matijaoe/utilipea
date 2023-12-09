import { isFunction } from '..'

/**
 * Creates an array from start to end (inclusive).
 *
 * @example
 * range(3)                  // yields 0, 1, 2, 3
 * range(0, 3)               // yields 0, 1, 2, 3
 * range(0, 3, 1, 'y')          // yields y, y, y, y
 * range(0, 3, 1, () => 'y')    // yields y, y, y, y
 * range(0, 3, 1, i => i)       // yields 0, 1, 2, 3
 * range(0, 3, 1, i => `y${i}`) // yields y0, y1, y2, y3
 * range(0, 3, obj)          // yields obj, obj, obj, obj
 * range(0, 6, 2, i => i)    // yields 0, 2, 4, 6
 */
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
