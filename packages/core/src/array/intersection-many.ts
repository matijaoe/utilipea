import type { ArrayMinLength } from '../models'
import { intersection } from './intersection'

/**
 * Create an intersection of all given arrays.
 * Returns elements that exist in all arrays.
 *
 * @example
 * intersectionMany([2, 1], [2, 3], [6, 2])
 * // => [2]
 *
 * // ---- Custom compare function ----
 * const cmp = (a, b) => Math.floor(a) === Math.floor(b);
 * intersectionMany([2.1, 1.2], [2.3, 3.4], cmp)
 * // => [2.1]
 * 
 * @see [utilipea.vercel.app/array/intersection.html](https://utilipea.vercel.app/array/intersection.html)
 */
export function intersectionMany<TElem>(...arrays: ArrayMinLength<TElem[], 2>): TElem[] {
  return arrays.reduce((result, arr) => {
    return intersection(result, arr)
  })
}
