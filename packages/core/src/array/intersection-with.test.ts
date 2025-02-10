import { describe, expect, it } from 'vitest'
import { intersectionWith } from './intersection-with'

describe('intersectionWith', () => {
  it('returns the correct intersectionWiths select special elements', () => {
    const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    const arr2 = [{ id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }]

    const result = intersectionWith(arr1, arr2, (a, b) => a.id === b.id)
    expect(result).toEqual([{ id: 3 }, { id: 4 }, { id: 5 }])
  })

  it('returns the correct intersectionWiths with comparator', () => {
    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [3, 4, 5, 6, 7]

    const result = intersectionWith(arr1, arr2, (a, b) => a % 2 === 0 && a === b)
    expect(result).toEqual([4])
  })

  it('handles 1 missing array', () => {
    const arr1 = [1, 2, 3, 4, 5]

    // @ts-expect-error - one array is missing
    const result = intersectionWith(arr1, (a, b) => a % 2 === 0 && a === b)
    expect(result).toEqual([])
  })

  it('can deal with different types', () => {
    const result = intersectionWith([{ id: 1 }, { id: 2 }], [1], (a, b) => a.id === b)
    expect(result).toEqual([{ id: 1 }])
  })
})
