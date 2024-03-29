import { boil } from './boil'

/**
 * Max gets the greatest value from a list
 *
 * @example
 * max([2, 3, 5]) // => 5
 * max([{ num: 1 }, { num: 2 }], x => x.num) // => { num: 2 }
 * 
 * @see https://utilipea.vercel.app/array/max.html
 * 
 */
export function max(array: readonly [number, ...number[]]): number
export function max(array: readonly number[]): number | undefined
export function max<T>(array: readonly T[], by: (item: T) => number): T | undefined
export function max<T>(
  array: readonly T[],
  by?: (item: T) => number
): T | undefined {
  by ??= (item: T) => item as unknown as number
  return boil(array, (a, b) => (by!(a) > by!(b) ? a : b))
}
