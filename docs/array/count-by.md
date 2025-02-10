---
category: Array
title: 'countBy'
---

# countBy

Create an object with the count of occurrences of an item in an array

## Basic Usage

```ts{11}
import { countBy } from 'utilipea'

const books = [
  { title: 'Brave New World', decade: '1930s' },
  { title: 'Animal Farm', decade: '1940s' },
  { title: 'The Hobbit', decade: '1930s' },
  { title: 'Grapes of Wrath', decade: '1930s' },
  { title: 'The Stranger', decade: '1940s' },
]

countBy(books, (book) => book.decade)
// => { '1930s': 3, '1940s': 2 }
```

## Type Declarations

```ts
declare const countBy: <T, TId extends PropertyKey>(list: readonly T[], identity: (item: T) => TId) => Record<TId, number>;
```
