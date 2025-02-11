import { describe, expect, it } from 'vitest'
import { list } from './list'

describe('list function', () => {
  it('should generate array with end 4', () => {
    expect(list({ end: 4 })).toEqual([0, 1, 2, 3, 4])
  })

  it('should generate array of length 5', () => {
    expect(list({ len: 5 })).toEqual([0, 1, 2, 3, 4])
  })

  it('should generate array of length 5 with step 2', () => {
    expect(list({ len: 3, step: 2 })).toEqual([0, 2])
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

  it('should generate array from 2 with length 10 and step 2 and fill', () => {
    expect(list({ start: 2, end: 5, step: 3, fill: 'gotcha' })).toEqual(['gotcha', 'gotcha'])
  })

  it('should generate array of length 2 with mapper', () => {
    expect(list({ len: 3, map: (i) => `num-${i + 1}` })).toEqual(['num-1', 'num-2', 'num-3'])
  })

  it('should generate array from 1 of length 2 with mapper', () => {
    expect(list({ start: 1, len: 3, map: (i) => `num-${i}` })).toEqual(['num-1', 'num-2', 'num-3'])
  })

  it('should throw an error with negative step', () => {
    expect(() => list({ len: 3, step: -1 })).toThrowError('The step must be greater than 0.')
  })
})
