---
category: Async
title: 'tryCatch'
---

# tryCatch

Execute a promise and return a tuple with the result or error.

## Basic usage

```ts
import { tryCatch } from 'utilipea';

const [data, error] = await tryCatch(fetch('https://example.com/api'))
if (error) {
  console.error(`Error: ${error.message}`)
}
 ```

## Type signature
```ts
declare function intersection<TElem>(...arraysOrCompareFn: ArrayMinLength<TElem[], 2>): TElem[];
declare function intersection<TArrays extends ArrayMinLength<unknown[], 2>>(...args: [...TArrays, CompareFunction<TArrays>]): TArrays[0];
```
