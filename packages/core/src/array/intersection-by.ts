import type { ArrayMinLength, ByIdentity } from '..'
import { isArray, isFunction, uniq, uniqBy } from '..'

/**
 * Create an intersection of all given arrays.
 *
 * The order is based on the first array.
 * 
 * Accepts an optional identity function to convert each item in the list to a comparable identity value
 */
export const intersectionBy = <
  TElem,
  TArrays extends ArrayMinLength<TElem[], 2>, 
>(...args: ArrayMinLength<TElem[], 2> | [...TArrays, ByIdentity<TElem>]): TArrays[0] => {
  const hasByDefined = !isArray(args.at(-1))
  const by = hasByDefined && args.pop() as ByIdentity<TElem>

  const [firstArray, ...restArrays] = args as TArrays

  if (!by) {
    return uniq(firstArray).filter((item) => restArrays.every((arr) => arr.includes(item))) 
  }

  const byFn = isFunction(by) ? by : (item: TElem) => item[by] as PropertyKey

  const uniqFirstArr = uniqBy(firstArray, byFn)
  return uniqFirstArr.filter((item) => {
    return restArrays.every((arr) => arr.some((restItem) => byFn(restItem) === byFn(item)))
  })
}
