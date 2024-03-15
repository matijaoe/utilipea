---
category: Array
title: 'intersection'
---

# intersection

Create an intersection of all given arrays

## Basic usage

Accepts any number of arrays as arguments. Returns a new array containing only the elements from the first array present in all given arrays.

```ts{3}
import { intersection } from 'utilipea'

intersection([2, 1], [2, 3], [6, 2])
// => [2]
```

## Advanced usage

It accepts a custom comparator function as the last argument.

```ts{2,8}
const cmp = (a, b) => Math.floor(a) === Math.floor(b)
intersection([2.1, 1.2], [2.3, 3.4], cmp)
// => [2.1]

const arr1 = [{ id: 1, name: 'Bob' }, { id: 2, name: 'Dave' }];
const arr2 = [{ id: 3, name: 'Carl' }, { id: 4, name: 'Bob' }];

intersection(arr1, arr2, (a, b) => a.name === b.name)
// => [{ id: 1, name: 'Bob' }]
```

### Comparison by value

Non-primitive values are compared by reference. To (deeply) compare by value, use [`isEqual`](/validate/is-equal.html).

```ts{9}
const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
const others = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
 
// Comparison by reference, no intersection
intersection(objects, others);
// => []

// Deep comparison by value, using `isEqual`
intersection(objects, others, isEqual);
// => [{ x: 1, y: 2 }]
```

## Type Declarations

```ts
declare function intersection<TElem>(...arraysOrCompareFn: ArrayMinLength<TElem[], 2>): TElem[];
declare function intersection<TArrays extends ArrayMinLength<unknown[], 2>>(...args: [...TArrays, CompareFn<TArrays>]): TArrays[0];
```
