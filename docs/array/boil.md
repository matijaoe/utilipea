---
category: Array
title: 'boil'
---

# boil

Reduce an array to a single item

## Basic Usage

Given an array of items return the final item that *wins* the comparison condition. Useful for complex min/max operations.

```ts{22,26}
import { boil } from 'utilipea'

const books = [
  {
    title: 'Ulysses',
    year: 1922,
    pages: 732
  },
  {
    title: 'Frankenstein',
    year: 1818,
    pages: 199
  },
  {
    title: 'Dune',
    year: 1965,
    pages: 412
  }
]

// longest
boil(books, (a, b) => a.pages > b.pages ? a : b)
// => { title: 'Ulysses', year: 1922, pages: 732 }

// oldest
boil(books, (a, b) => a.year < b.year ? a : b)
// => { title: 'Frankenstein', year: 1818, pages: 199 }
```

## Type Declarations

```ts
declare const boil: <T>(array: readonly T[], cmp: (a: T, b: T) => T) => T;
```

## Related

* [`min`](/array/min)
* [`max`](/array/max)
