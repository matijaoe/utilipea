import type { ByIdentity } from '../models'
import { isFunction } from '../typed'
import { boil } from './boil'

/**
 * Max gets the greatest value from a list
 *
 * @example
 * max([2, 3, 5]) // => 5
 * max([{ num: 1 }, { num: 2 }], x => x.num) // => { num: 2 }
 * max([{ num: 1 }, { num: 2 }], 'num') // => { num: 2 }
 * 
 * @see https://utilipea.vercel.app/array/max.html
 * 
 */

export function max(array: readonly [number, ...number[]]): number
export function max(array: readonly number[]): number | undefined
export function max<T>(array: readonly T[], by: ByIdentity<T, number>): T | undefined
export function max<T>(
  array: readonly T[],
  by?: ByIdentity<T, number>
): T | undefined {
  by ??= (item: T) => item as unknown as number
   
  const byFn = isFunction(by) ? by : (item: T) => item[by]
  return boil(array, (a, b) => (byFn(a) > byFn(b) ? a : b))
}
