---
category: Array
title: 'list'
---

# list

Create an array of elements

## Basic usage

```ts
import { list } from 'utilipea'

list({ len: 3 })
// => [0, 1, 2]

list({ end: 3 }) 
// => [0, 1, 2, 3]

list({ start: 1, end: 3 })
// => [1, 2, 3]

list({ start: 1, len: 3 })
// => [1, 2, 3]

list({ start: 1, end: 5, step: 2 })
// => [1, 3, 5]

list({ start: 1, end: 3, fill: 'a' }) 
// => ['a', 'a', 'a']

list({ start: 1, end: 3, map: (i) => i * i }) 
// => [1, 4, 9]
```

## Parameters

Either `len` or `end` must be provided. `start` and `end` are inclusive.

| Name | Type | Description |
| --- | --- | --- |
| `start` | `number` | Start index. Defaults to `0`. Inclusive. |
| `end` | `number` | End index. Defaults to `start + 1`. Inclusive.|
| `len` | `number` | Length of the array. Defaults to `end - start + 1`. |
| `step` | `number` | Step between elements. Defaults to `1`. |
| `fill` | `any` | Value to fill the array with. |
| `map` | `(i: number) => any` | Function to map the array elements. |

## Type Declarations

```ts
type Mapper<T = number> = (i: number) => T

export type BaseRangeOptions<T = number> = {
  start?: number
  step?: number
  fill?: T
  map?: Mapper<T>
}

type RangeOptionsEnd<T = number> = BaseRangeOptions<T> & { end: number }
type RangeOptionsLen<T = number> = BaseRangeOptions<T> & { len: number }

type RangeOptions<T> = RangeOptionsEnd<T> | RangeOptionsLen<T>

declare const list: <T = number>(opts: RangeOptions<T>) => T[];
```

## Related

- [`range`](/array/range)
- [`rangeGen`](/array/range-gen)
