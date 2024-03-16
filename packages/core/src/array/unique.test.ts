import { describe, expect, it } from 'vitest'
import { isEqual } from '../validate'
import { uniq } from './uniq'

describe('[array] uniq', () => {
  it('returns uniq elements from an array of numbers', () => {
    const result = uniq([1, 2, 2, 3, 3, 4])
    expect(result).toEqual([1, 2, 3, 4])
  })

  it('returns uniq elements from an array of strings', () => {
    const result = uniq(['a', 'b', 'a', 'c', 'b'])
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('returns uniq elements using a custom comparison function', () => {
    const result = uniq([1, 1.5, 2, 2.1], (a, b) => Math.floor(a) === Math.floor(b))
    expect(result).toEqual([1, 2])
  })

  it('returns uniq strings ignoring case', () => {
    const result = uniq(['apple', 'APPLE', 'banana'], (a, b) => a.toLowerCase() === b.toLowerCase())
    expect(result).toEqual(['apple', 'banana'])
  })

  it('returns an empty array when input is empty', () => {
    const result = uniq([])
    expect(result).toEqual([])
  })

  it('returns uniq elements from an array with mixed types', () => {
    const result = uniq([1, '2', '1', 2])
    expect(result).toEqual([1, '2', '1', 2])
  })

  it('returns uniq elements from an array with mixed types with conversion', () => {
    const result = uniq([1, '2', '1', 2], (a, b) => a.toString() === b.toString())
    expect(result).toEqual([1, '2'])
  })
  
  it('compare with isEqual', () => {
    const result = uniq([{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 2 }], isEqual)
    expect(result).toEqual([{ x: 1, y: 2 }, { x: 2, y: 1 }])
  })
})
