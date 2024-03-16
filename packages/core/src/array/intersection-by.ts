import type { ArrayMinLength, By } from '..'
import { isArray, isFunction, uniq, uniqBy } from '..'

/**
 * Create an intersection of all given arrays.
 *
 * The order is based on the first array.
 * 
 * Accepts an optional identity function to convert each item in the list to a comparable identity value
 * 
 */
export const intersectionBy = <
  TElem,
  TArrays extends ArrayMinLength<TElem[], 2>, 
  TKey extends keyof TElem
>(...args: ArrayMinLength<TElem[], 2> | [...TArrays, By<TElem, TKey>]): TArrays[0] => {
  const hasByDefined = !isArray(args.at(-1))
  const by = hasByDefined && args.pop() as By<TElem, TKey>

  const [firstArray, ...restArrays] = args as TArrays

  if (!by) {
    return uniq(firstArray).filter((item) => restArrays.every((arr) => arr.includes(item))) 
  }

  const byFn = isFunction(by) ? by : (item: TElem) => item[by]

  const uniqFirstArr = uniqBy(firstArray, byFn)
  return uniqFirstArr.filter((item) => {
    return restArrays.every((arr) => arr.some((restItem) => byFn(restItem) === byFn(item)))
  })
}
