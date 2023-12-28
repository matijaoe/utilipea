---
category: Array
title: 'clampArrayRange'
---

# clampArrayRange

Clamp a number to the index range of an array

## Basic Usage

Assures that a number is within the index range of an array. If the number is out of range, it will be clamped to the nearest valid index.

```ts
import { clampArrayRange } from 'utilipea'

const books = ['Frankenstein', 'Ulysses', 'Dune']

// in range, return as is
clampArrayRange(0, books) // => 0
clampArrayRange(1, books) // => 1
clampArrayRange(2, books) // => 2

// out of range, return min index
clampArrayRange(-1, books) // => 0
clampArrayRange(-2, books) // => 0

// out of range, return max index
clampArrayRange(3, books) // => 2
clampArrayRange(4, books) // => 2
```

## Type Declarations

```ts
declare const clampArrayRange: (n: number, arr: readonly unknown[]) => number;
```
