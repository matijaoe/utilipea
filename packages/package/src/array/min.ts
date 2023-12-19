import { boil } from './boil'

/**
 * Min gets the smallest value from a list
 *
 * @example
 * min([2, 3, 5]) // => 2
 * min([{ num: 1 }, { num: 2 }], x => x.num) // => { num: 1 }
 */
export function min(array: readonly [number, ...number[]]): number
export function min(array: readonly number[]): number | null
export function min<T>(array: readonly T[], by: (item: T) => number): T | null
export function min<T>(
  array: readonly T[],
  by?: (item: T) => number
): T | null {
  by ??= (item: any) => item
  return boil(array, (a, b) => (by!(a) < by!(b) ? a : b))
}
