---
category: Array
title: 'max'
---

# max

Return the largest item in an array

## Basic usage

```ts{22,26,31}
import { max } from 'utilipea'

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
max(books, (book) => book.pages)
// => { title: 'Ulysses', year: 1922, pages: 732 }

// most recent
max(books, (book) => book.year)
// => { title: 'Dune', year: 1965, pages: 412 }

// basic usage without a getter function
const pages = Object.values(books).map((book) => book.pages)
max(pages)
// => 732
```

## Type Declarations

```ts
declare function max(array: readonly [number, ...number[]]): number;
declare function max(array: readonly number[]): number | undefined;
declare function max<T>(array: readonly T[], by: (item: T) => number): T | undefined;
```
