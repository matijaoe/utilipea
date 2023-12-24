---
category: Array
title: 'intersects'
---

# intersects

Determine if two arrays have a common element

## Basic usage

```ts{3,6}
import { intersects } from 'utilipea'

intersects([1, 2], [2, 3])
// => true

intersects([1, 2], [4, 3])
// => false
```

## Advanced usage

Pass a getter function as the last argument to compare by a specific property.

```ts{4,7}
const presidents = [{ id: 1, name: 'Donald' }, { id: 2, name: 'Joe' }]
const podcasters = [{ id: 3, name: 'Joe' }, { id: 4, name: 'Theo' }]

intersects(presidents, podcasters, (a) => a.name)
// => true

intersects(presidents, podcasters, (a) => a.id)
// => false
```

## Type Declarations

```ts
declare const intersects: <T, K extends PropertyKey>(listA: readonly T[], listB: readonly T[], identity?: (x: T) => K) => boolean;
```
