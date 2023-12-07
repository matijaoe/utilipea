import { describe, expect, it } from 'vitest'
import { list } from './list'

describe('list function', () => {
  it('should generate array with length 3', () => {
    expect(list(3)).toEqual([0, 1, 2])
  })

  it('should generate array from 0 to 3 inclusive', () => {
    expect(list(0, 3)).toEqual([0, 1, 2, 3])
  })

  it('should generate array from 1 to 6 with step 2', () => {
    expect(list(1, 6, 2)).toEqual([1, 3, 5])
  })

  it('should generate array from 1 to 5 with mapper', () => {
    expect(list(1, 5, 1, (i) => i ** 2)).toEqual([1, 4, 9, 16, 25])
  })

  it('should generate array from 1 to 5 with value', () => {
    expect(list(1, 3, 1, null)).toEqual([null, null, null])
  })

  it('should generate array with end 4', () => {
    expect(list({ end: 4 })).toEqual([0, 1, 2, 3, 4])
  })

  it('should generate array of length 5', () => {
    expect(list({ len: 5 })).toEqual([0, 1, 2, 3, 4])
  })

  it('should generate array of length 2 with fill', () => {
    expect(list({ len: 3, fill: 0 })).toEqual([0, 0, 0])
  })

  it('should generate array of length 2 with mapper', () => {
    expect(list({ len: 3, fill: (i) => `num-${i + 1}` })).toEqual(['num-1', 'num-2', 'num-3'])
  })

  it('should generate array from 1 with length 5', () => {
    expect(list({ start: 2, len: 5 })).toEqual([2, 3, 4, 5, 6])
  })

  it('should generate array from 1 to 5', () => {
    expect(list({ start: 2, end: 5 })).toEqual([2, 3, 4, 5])
  })

  it('should generate array from 2 to 10 with step 2', () => {
    expect(list({ start: 2, end: 10, step: 2 })).toEqual([2, 4, 6, 8, 10])
  })

  it('should generate array from 2 with length 10 and step 2', () => {
    expect(list({ start: 2, len: 10, step: 2 })).toEqual([2, 4, 6, 8, 10])
  })
})
