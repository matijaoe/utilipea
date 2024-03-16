import { describe, expect, it } from 'vitest'
import { intersectionBy } from './intersection'

describe('intersection', () => {
  it('returns the correct intersections', () => {
    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [3, 4, 5, 6, 7]

    const result = intersectionBy(arr1, arr2)
    expect(result).toEqual([3, 4, 5])
  })

  it('returns the correct intersections with comparator', () => {
    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [3, 4, 5, 6, 7]

    const result = intersectionBy(arr1, arr2, (a, b) => a % 2 === 0 && a === b)
    expect(result).toEqual([4])
  })

  it('returns uniq( values', () => {
    const arr1 = [1, 2, 3, 3, 4, 5]
    const arr2 = [3, 4, 5, 6, 7]
    const arr3 = [3, 4, 5, 6, 7]

    const result = intersectionBy(arr1, arr2, arr3)
    expect(result).toEqual([3, 4, 5])
  })

  it('handles 1 missing array', () => {
    const arr1 = [1, 2, 3, 4, 5]

    // @ts-expect-error - one array is missing
    const result = intersectionBy(arr1, (a, b) => a % 2 === 0 && a === b)
    expect(result).toEqual([])
  })

  it('can deal with different types', () => {
    const result = intersectionBy([{ id: 1 }, { id: 2 }], [1], (a, b) => a.id === b)
    expect(result).toEqual([{ id: 1 }])
  })
})
