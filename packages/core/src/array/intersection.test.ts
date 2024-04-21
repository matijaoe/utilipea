import { describe, expect, it } from 'vitest'
import { intersection } from './intersection'

describe('intersection', () => {
  it('returns the correct intersections', () => {
    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [3, 4, 5, 6, 7]

    const result = intersection(arr1, arr2)
    expect(result).toEqual([3, 4, 5])
  })

  it('returns the correct intersections select special elements', () => {
    const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    const arr2 = [{ id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }]

    const result = intersection(arr1, arr2, (a, b) => a.id === b.id)
    expect(result).toEqual([{ id: 3 }, { id: 4 }, { id: 5 }])
  })

  it('returns the correct intersections with comparator', () => {
    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [3, 4, 5, 6, 7]

    const result = intersection(arr1, arr2, (a, b) => a % 2 === 0 && a === b)
    expect(result).toEqual([4])
  })

  it('returns uniq( values', () => {
    const arr1 = [1, 2, 3, 3, 4, 5]
    const arr2 = [3, 4, 5, 6, 7]
    const arr3 = [3, 4, 5, 6, 7]

    const result = intersection(arr1, arr2, arr3)
    expect(result).toEqual([3, 4, 5])
  })

  it('handles 1 missing array', () => {
    const arr1 = [1, 2, 3, 4, 5]

    // @ts-expect-error - one array is missing
    const result = intersection(arr1, (a, b) => a % 2 === 0 && a === b)
    expect(result).toEqual([])
  })
})
