---
category: Array
title: 'diff'
---

# diff

Return an array containing items that exist only in the first array

## Basic usage

Given any number of arrays, returns an array of all items that exist in the first array but do not exist in the other arrays.

```ts{3,6}
import { diff } from 'utilipea'

diff([1, 2, 3], [2, 4, 5])
// => [1, 3]

diff([1, 2, 3], [2, 4, 5], [3, 4])
// => [1]
```

## Advanced usage

Pass a getter function as the last argument to compare by a specific property.

```ts{4}
const arr1 = [{ id: 1, name: 'Bob' }, { id: 2, name: 'Dave' }];
const arr2 = [{ id: 3, name: 'Carl' }, { id: 4, name: 'Bob' }];

diff(arr1, arr2, (a, b) => a.name === b.name)
// => [{ id: 2, name: 'Dave' }]
```

## Type Declarations

```ts
declare function diff<TElem>(...args: ArrayMinLength<TElem[], 2>): TElem[];
declare function diff<TArrays extends ArrayMinLength<unknown[], 2>>(...args: [...TArrays, CompareFunction<TArrays>]): TArrays[0];
```

## Related

* [`symmetricDiff`](/array/symmetric-diff)
