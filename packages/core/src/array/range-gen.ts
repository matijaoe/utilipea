import { isDef, isFunction } from '..'

/**
 * Generate values from start to end (exclusive), using a generator.
 *
 * When only a single argument is provided, it generates values from 0 to length (exclusive).
 *
 * @category Array
 *
 * @example
 * // With length:
 * for (const num of rangeGen(3)) {
 *   console.log(num)
 * }
 * // => 0 1 2
 *
 * // With start and end:
 * for (const num of rangeGen(1, 5)) {
 *   console.log(num)
 * }
 * // => 1 2 3 4
 *
 * // With a step value:
 * for (const num of rangeGen(0, 10, 3)) {
 *   console.log(num)
 * }
 * // => 0 3 6 9
 *
 * // With a mapper function:
 * for (const square of rangeGen(1, 4, 1, (i) => i * i)) {
 *   console.log(square)
 * }
 * // => 1 4 9
 * 
 *  @see [utilipea.vercel.app/array/range-gen.html](https://utilipea.vercel.app/array/range-gen.html)
 * 
 */
export function* rangeGen<T = number>(
  startOrLength: number,
  end?: number,
  step: number = 1,
  valueOrMapper: T | ((i: number) => T) = (i) => i as T,
): Generator<T> {
  const start = isDef(end) ? startOrLength : 0
  const final = isDef(end) ? end : startOrLength - 1
  const mapper = isFunction(valueOrMapper) ? valueOrMapper : () => valueOrMapper

  for (let i = start; i <= final; i += step) {
    yield mapper(i)
    if (i + step > final) {
      break
    }
  }
}
