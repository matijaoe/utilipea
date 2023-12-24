---
category: Array
title: 'count'
---

# count

Create an object with the count of occurrences of an item in an array

## Basic Usage


```ts{11}
import { count } from 'utilipea'

const books = [
  { title: 'Brave New World', decade: '1930s' },
  { title: 'Animal Farm', decade: '1940s' },
  { title: 'The Hobbit', decade: '1930s' },
  { title: 'Grapes of Wrath', decade: '1930s' },
  { title: 'The Stranger', decade: '1940s' },
]

count(books, (book) => book.decade)
// => { '1930s': 3, '1940s': 2 }
```

