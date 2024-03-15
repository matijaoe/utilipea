import { describe, expect, it } from 'vitest'
import { isEqual } from '../validate'
import { unique } from './unique'

describe('[array] unique', () => {
  it('returns unique elements from an array of numbers', () => {
    const result = unique([1, 2, 2, 3, 3, 4])
    expect(result).toEqual([1, 2, 3, 4])
  })

  it('returns unique elements from an array of strings', () => {
    const result = unique(['a', 'b', 'a', 'c', 'b'])
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('returns unique elements using a custom comparison function', () => {
    const result = unique([1, 1.5, 2, 2.1], (a, b) => Math.floor(a) === Math.floor(b))
    expect(result).toEqual([1, 2])
  })

  it('returns unique strings ignoring case', () => {
    const result = unique(['apple', 'APPLE', 'banana'], (a, b) => a.toLowerCase() === b.toLowerCase())
    expect(result).toEqual(['apple', 'banana'])
  })

  it('returns an empty array when input is empty', () => {
    const result = unique([])
    expect(result).toEqual([])
  })

  it('returns unique elements from an array with mixed types', () => {
    const result = unique([1, '2', '1', 2])
    expect(result).toEqual([1, '2', '1', 2])
  })

  it('returns unique elements from an array with mixed types with conversion', () => {
    const result = unique([1, '2', '1', 2], (a, b) => a.toString() === b.toString())
    expect(result).toEqual([1, '2'])
  })
  
  it('compare with isEqual', () => {
    const result = unique([{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 2 }], isEqual)
    expect(result).toEqual([{ x: 1, y: 2 }, { x: 2, y: 1 }])
  })
})
