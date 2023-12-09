import { describe, expect, it } from 'vitest'
import { range } from '.'

describe('[array] range', () => {
  it('returns an array of numbers from 0 to the given length', () => {
    expect(range(3)).toEqual([0, 1, 2])
  })

  it('returns an array of numbers from start to end', () => {
    expect(range(1, 4)).toEqual([1, 2, 3])
  })

  it('returns an array of numbers from start to end with a step', () => {
    expect(range(0, 6, 2)).toEqual([0, 2, 4])
  })

  it('returns an array of numbers from start to end with a negative step', () => {
    expect(range(6, 0, -2)).toEqual([6, 4, 2])
    expect(range(6, 0, 2)).toEqual([6, 4, 2])
  })

  it('returns an empty array when start is equal to end', () => {
    expect(range(10, 10)).toEqual([])
  })

  it('returns an array of first element when step larger than length', () => {
    expect(range(1, 5, 5)).toEqual([1])
  })

  it('throw an error if the step is 0 or negative', () => {
    expect(() => range(1, 5, 0)).toThrowError()
    expect(() => range(1, 5, -1)).toThrowError()
  })
})
