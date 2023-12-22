import { describe, expect, it } from 'vitest'
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

  it('returns unique objects based on a property', () => {
    const result = unique([{ id: 1 }, { id: 2 }, { id: 1 }], { by: (item) => item.id })
    expect(result).toEqual([{ id: 1 }, { id: 2 }])
  })

  it('returns unique arrays based on the first element', () => {
    const result = unique([[1, 2], [1, 2], [3, 4]], { by: (item) => item.at(0) })
    expect(result).toEqual([[1, 2], [3, 4]])
  })

  it('returns unique elements using a custom comparison function', () => {
    const result = unique([1, 1.5, 2, 2.1], { cmp: (a, b) => Math.floor(a) === Math.floor(b) })
    expect(result).toEqual([1, 2])
  })

  it('returns unique strings ignoring case', () => {
    const result = unique(['apple', 'APPLE', 'banana'], { cmp: (a, b) => a.toLowerCase() === b.toLowerCase() })
    expect(result).toEqual(['apple', 'banana'])
  })

  it('returns an empty array when input is empty', () => {
    const result = unique([])
    expect(result).toEqual([])
  })

  it('returns unique elements from an array with mixed types', () => {
    const result = unique([1, '1', 2, '2'])
    expect(result).toEqual([1, '1', 2, '2'])
  })

  it('returns unique complex objects based on a property', () => {
    const result = unique([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' }
    ], { by: (item) => item.id })
    expect(result).toEqual([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }])
  })
})
