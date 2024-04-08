import type { ByIdentity } from '../models'
import { isFunction } from '../typed'
import { boil } from './boil'

/**
 * Min gets the smallest value from a list
 *
 * @example
 * min([2, 3, 5]) // => 2
 * min([{ num: 1 }, { num: 2 }], x => x.num) // => { num: 1 }
 * min([{ num: 1 }, { num: 2 }], 'num') // => { num: 1 }
 * 
 * @see https://utilipea.vercel.app/array/min.html
 */
export function min(array: readonly [number, ...number[]]): number
export function min(array: readonly number[]): number | undefined
export function min<T>(array: readonly T[], by: ByIdentity<T, number>): T | undefined
export function min<T>(
  array: readonly T[],
  by?: ByIdentity<T, number>
): T | undefined {
  by ??= (item: T) => item as unknown as number
   
  const byFn = isFunction(by) ? by : (item: T) => item[by]
  return boil(array, (a, b) => (byFn(a) < byFn(b) ? a : b))
}
