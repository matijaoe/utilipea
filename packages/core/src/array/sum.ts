import { isNumber } from '..'

/**
 * Calculate the sum of an array of numbers or objects.
 *
 * @category Number
 *
 * @example
 * sum([1, 2, 3, 4, 5])
 * // => 15
 *
 * sum([{ val: 1 }, { val: 2 }, { val: 3 }], (item) => item.val)
 * // => 6
 *
 * with fn
 * sum([1, 2, 3], (x) => x * x)
 * // => 14
 *
 * sum([])
 * // => 0
 * 
 * @see [utilipea.vercel.app/array/sum.html](https://utilipea.vercel.app/array/sum.html)
 * 
 */
export function sum(array: readonly [number, ...number[]]): number
export function sum(array: readonly number[]): number
export function sum<T>(array: readonly T[], fn: (item: T) => number): number
export function sum<T extends number | object>(
  array: readonly T[],
  fn?: (item: T) => number
) {
  fn ??= (item: T) => isNumber(item) ? item : 0
  return array?.reduce((acc, item) => acc + fn!(item), 0) ?? 0
}
