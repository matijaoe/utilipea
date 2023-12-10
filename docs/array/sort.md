---
category: Array
---

# sort

Sorts an array based on the specified criteria. Does not mutate the original array.

Handles number and locale-aware string sorting out of the box. For more complex sorting, it accepts a custom function to extract the value to sort by.

## Parameters
- `arr`: The array to sort.
- `criteria`: An optional list of sort criteria. Each criterion is an object with the following properties:
  - `order`: The sort order. 
    - `'asc'` for ascending order (default)
    - `'desc'` for descending order.
  - `by`: A function that takes an item from the array and returns a value to sort by. The function can return a number, a bigint, a Date, or a string.

## Usage

```ts
import { sort } from '@matijaoe/utils'

const fruit = ['banana', 'apple', 'fig', 'pineapple', 'pear']

sort(fruit)
// [ "apple", "banana", "fig", "pear", "pineapple" ]

sort(fruit, { order: 'desc' })
// [ "pineapple", "pear", "fig", "banana", "apple" ]

sort(fruit, { by: (item) => item.length })
// [ "fig", "pear", "apple", "banana", "pineapple" ]
```

### Multiple criteria


```ts
const animals = [
  { name: 'horse', lifespan: 25 },
  { name: 'tortoise', lifespan: 100 },
  { name: 'parrot', lifespan: 80 },
  { name: 'rabbit', lifespan: 10 },
  { name: 'goldfish', lifespan: 10 },
  { name: 'mouse', lifespan: 2 },
]

// Sort by lifespan in descending order,
// then by name in ascending order
sort(
  animals,
  { order: 'desc', by: (item) => item.lifespan },
  { by: (item) => item.name }
)

/*
[
  { name: 'tortoise', lifespan: 100 },
  { name: 'parrot', lifespan: 80 },
  { name: 'horse', lifespan: 25 },
  { name: 'goldfish', lifespan: 10 },
  { name: 'rabbit', lifespan: 10 },
  { name: 'mouse', lifespan: 2 },
]
*/
```


