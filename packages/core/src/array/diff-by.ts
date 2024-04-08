import type { ArrayMinLength, ByIdentity } from '../models'
import { isArray, isFunction } from '../typed'
import { flatten } from './flatten'

export function diffBy<
  TElem, 
  TArrays extends ArrayMinLength<TElem[], 2>, 
>(...args: ArrayMinLength<TElem[], 2> | [...TArrays, ByIdentity<TElem>]): TArrays[0] {
  const hasByDefined = !isArray(args.at(-1))
  const by = hasByDefined && args.pop() as ByIdentity<TElem>

  const [firstArray, ..._restArrays] = args as TArrays
  const restArrays = flatten(_restArrays)

  if (!by) {
    const restSet = new Set(restArrays)
    return firstArray.filter((item) => !restSet.has(item))
  }
  
  const byFn = isFunction(by) ? by : (item: TElem) => item[by]

  return firstArray.filter((item) => {
    const itemKey = byFn(item)
    return !restArrays.some((restItem) => byFn(restItem) === itemKey)
  })
}
