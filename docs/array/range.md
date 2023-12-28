---
category: Array
title: 'range'
---

# range

Create a range of numbers.

Similar to Python's [`range`](https://cs.stanford.edu/people/nick/py/python-range.html) function.

## Basic usage

Can be used with length, or with start and end.

```ts
import { range } from 'utilipea'

// Numbers up to 5
range(5)
// => [0, 1, 2, 3, 4]

// Even numbers between 0 and 5
range(0, 5)
// => [0, 1, 2, 3, 4]

// Even numbers between 0 and 10, with step 2
range(0, 10, 2)
// => [0, 2, 4, 6, 8]
```

### Descending range

Creates a descending range of numbers, when `start` is greater than `end`.

```ts
range(5, 0)
// => [5, 4, 3, 2, 1]

range(5, 0, -2) // same as range(5, 0, 2)
// => [5, 3, 1]
```

## Parameters

### With `length `

```ts
function range(length: number): number[];
```

| Name | Type | Description |
| --- | --- | --- |
| `length` | `number` | Length of the array. Starts from 0 |

### With `start` and `end`

```ts
function range(start: number, end: number, step?: number): number[];
```

| Name | Type | Description |
| --- | --- | --- |
| `start` | `number` | Start index. Defaults to `0`. Inclusive. |
| `end` | `number` | End index. Exclusive. |
| `step` | `number` | Step between elements. Defaults to `1`. |

## Related

- [`rangeGen`](/array/range-gen)
- [`list`](/array/range)
