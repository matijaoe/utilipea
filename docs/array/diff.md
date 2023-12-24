---
category: Array
title: 'diff'
---

# diff

Return an array containing items that exist only in the first array

## Basic usage

Given two arrays, returns an array of all items that exist in the first array but do not exist in the other arrays.

```ts{3}
import { diff } from 'utilipea'

diff([1, 2], [2, 3])
// => [1, 3]
```

## Advanced usage

```ts{4}
const arr1 = [{ id: 1, name: 'Bob' }, { id: 2, name: 'Dave' }];
const arr2 = [{ id: 3, name: 'Carl' }, { id: 4, name: 'Bob' }];

diff(arr1, arr2, (a, b) => a.name === b.name)
// => [{ id: 2, name: 'Dave' }]
```

## Type Declarations

```ts
declare const count: <T, TId extends PropertyKey>(list: readonly T[], identity: (item: T) => TId) => Record<TId, number>;
```
