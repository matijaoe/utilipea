import { boil } from './boil'

/**
 * Min gets the smallest value from a list
 *
 * @example
 * min([2, 3, 5]) // => 2
 * min([{ num: 1 }, { num: 2 }], x => x.num) // => { num: 1 }
 * 
 * @see [utilipea.vercel.app/array/min.html](https://utilipea.vercel.app/array/min.html)
 * 
 */
export function min(array: readonly [number, ...number[]]): number
export function min(array: readonly number[]): number | undefined
export function min<T>(array: readonly T[], by: (item: T) => number): T | undefined
export function min<T>(
  array: readonly T[],
  by?: (item: T) => number
): T | undefined {
  by ??= (item: T) => item as unknown as number
  return boil(array, (a, b) => (by!(a) < by!(b) ? a : b))
}
