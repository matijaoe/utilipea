/* eslint-disable unicorn/no-null */
import { describe, expect, it } from 'vitest'
import { diff } from './diff'

describe('diff', () => {
  it('return the difference between two arrays', () => {
    const array1 = [1, undefined, null, Number.NaN, 3, 4, 5]
    const array2 = [2, 4, undefined, Number.NaN, null, 8]
    const result = diff(array1, array2)
    expect(result).toEqual([1, 3, 5])
  })

  it('return match based on input function', () => {
    expect(diff([2.1, 1.2], [2.3, 3.4], [99], (a, b) => Math.floor(a) === Math.floor(b))).toEqual([1.2])
  })

  it('return an array containing the elements that are present in the first array but not in the other arrays', () => {
    const array1 = [1, 2, 3, 4]
    const array2 = [2, 3, 5, 6]
    const array3 = [3, 4, 5, 6]

    const diffs = diff(array1, array2, array3)
    expect(diffs).toEqual([1])
  })

  it('return an empty array if no elements are present in the first array but not in the other arrays', () => {
    const array1 = [1, 2, 3, 4]
    const array2 = [1, 2]
    const array3 = [3, 4]

    const diffs = diff(array1, array2, array3)
    expect(diffs).toEqual([])
  })

  it('return the first array if no elements are present in the other arrays', () => {
    const array1 = [1, 2, 3, 4]
    const array2: number[] = []

    const diffs = diff(array1, array2)
    expect(diffs).toEqual(array1)
  })

  it('can deal with different types', () => {
    const diffs = diff([{ id: 1 }, { id: 2 }], [1], (a, b) => a.id === b)
    expect(diffs).toEqual([{ id: 2 }])
  })
})
