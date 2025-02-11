import type { ArrayMinLength, CompareFunction } from '..'

// todo
// add symmetric https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/symmetricDifference

export function diff<TElem>(...args: ArrayMinLength<TElem[], 2>): TElem[]
export function diff<TArrays extends ArrayMinLength<unknown[], 2>>(...args: [...TArrays, CompareFunction<TArrays>]): TArrays[0]
export function diff<TArrays extends ArrayMinLength<unknown[], 2>, TElem>(...args: ArrayMinLength<TElem[], 2> | [...TArrays, CompareFunction<TArrays>]): TArrays[0] {}
