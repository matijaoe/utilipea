import { describe, expect, it } from 'vitest'
import { uniqueBy } from './unique-by'

describe('[array] unique', () => {
  it('returns unique elements from an array of numbers', () => {
    const result = uniqueBy([1, 2, 2, 3, 3, 4])
    expect(result).toEqual([1, 2, 3, 4])
  })

  it('returns unique elements from an array of strings', () => {
    const result = uniqueBy(['a', 'b', 'a', 'c', 'b'])
    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('returns unique objects based on a property', () => {
    const result = uniqueBy([{ id: 1 }, { id: 2 }, { id: 1 }], 'id')
    expect(result).toEqual([{ id: 1 }, { id: 2 }])
  })

  it('returns unique arrays based on the first element', () => {
    const result = uniqueBy([[1, 2], [1, 2], [3, 4]], (item) => item.at(0)!)
    expect(result).toEqual([[1, 2], [3, 4]])
  })

  it('returns an empty array when input is empty', () => {
    const result = uniqueBy([])
    expect(result).toEqual([])
  })

  it('returns unique elements from an array with mixed types', () => {
    const result = uniqueBy([1, '1', 2, '2'])
    expect(result).toEqual([1, '1', 2, '2'])
  })

  it('returns unique complex objects based on a property', () => {
    const result = uniqueBy([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' }
    ], 'id')
    expect(result).toEqual([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }])
  })
})
