---
category: Array
title: 'min'
---

# min

Return the smallest item in an array

## Basic usage

```ts{22,26,31}
import { min } from 'utilipea'

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

// shortest
min(books, (book) => book.pages)
// => { title: 'Frankenstein', year: 1818, pages: 199 }

// oldest
min(books, (book) => book.year)
// => { title: 'Frankenstein', year: 1818, pages: 199 }

// basic usage without a getter function
const pages = Object.values(books).map((book) => book.pages)
min(pages)
// => 199
```

## Type Declarations

```ts
declare function min(array: readonly [number, ...number[]]): number;
declare function min(array: readonly number[]): number | undefined;
declare function min<T>(array: readonly T[], by: (item: T) => number): T | undefined;
```
