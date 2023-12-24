---
category: Array
title: 'chunk'
---

# chunk

Split an array into smaller chunks of a specified size

## Basic Usage

Splits an array into smaller chunks of a specified size (`n`). All but last chunk are guaranteed to be of size `n`. If the last chunk is smaller than specified chunk size `n`, it will be returned as is.

```ts{5}
import { chunk } from 'utilipea'

const books = ['Dracula', 'Ulysses', 'Dune', '1984', 'Hamlet', 'Stoner', 'Lolita']

chunk(books, 3)
// => [
//   ['Dracula', 'Ulysses', 'Dune'],
//   ['1984', 'Hamlet', 'Stoner']
//   ['Lolita']
// ]
```
