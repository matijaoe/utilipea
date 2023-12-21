---
category: array
title: 'sort'
---

# sort

Sorts an array based on the specified criteria. Does not mutate the original array.

## Usage

Handles number and locale-aware string sorting out of the box. 

For more complex sorting, it accepts a custom function to extract the value to sort by.

```ts
import { sort } from '@matijaoe/utils'

const fruit = ['banana', 'apple', 'fig', 'pineapple', 'pear']

sort(fruit)
// => [ "apple", "banana", "fig", "pear", "pineapple" ]

sort(fruit, { order: 'desc' })
// => [ "pineapple", "pear", "fig", "banana", "apple" ]

sort(fruit, { by: (item) => item.length })
// => [ "fig", "pear", "apple", "banana", "pineapple" ]
```

### Multiple criteria

Allows for sorting by multiple criteria, applied in the order they are specified.

```ts
const animals = [
  { name: 'tortoise', lifespan: 100 },
  { name: 'rabbit', lifespan: 10 },
  { name: 'mouse', lifespan: 2 },
  { name: 'parrot', lifespan: 80 },
  { name: 'goldfish', lifespan: 10 },
]

// Sort by lifespan (desc), then by name (asc)
sort(
  animals,
  { order: 'desc', by: (item) => item.lifespan },
  { by: (item) => item.name }
)

/* => [
  { name: 'tortoise', lifespan: 100 },
  { name: 'parrot', lifespan: 80 },
  { name: 'goldfish', lifespan: 10 },
  { name: 'rabbit', lifespan: 10 },
  { name: 'mouse', lifespan: 2 },
] */
```


## Arguments
- `arr`: The array to sort.
- `criteria`: An optional list of sort criteria. Each criterion is an object with the following properties:
  - `order`: The sort order. 
    - `'asc'` for ascending order (default)
    - `'desc'` for descending order.
  - `by`: A function that takes an item from the array and returns a value to sort by. The function can return a number, a bigint, a Date, or a string.

## Source

- [Source](https://github.com/matijaoe/utils/blob/main/packages/package/src/array/sort.ts)
- [Tests](https://github.com/matijaoe/utils/blob/main/packages/package/src/array/sort.test.ts)
- [Docs](https://github.com/matijaoe/utils/blob/main/docs/array/sort.md)

