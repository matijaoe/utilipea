import { describe, expect, it } from 'vitest'
import { chunk } from './chunk'

describe('chunk', () => {
  it('should return an array of chunks of the given size (default 2)', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9],
    ])
  })

  it('should return an array of chunks of the given size', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])
  })

  it('should return an array of chunks of uneven size', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7, 8], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8],
    ])
  })

  it('should return an empty array when given an empty array', () => {
    expect(chunk([])).toEqual([])
  })

  it('should return an empty array when given size 0', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7, 8], 0)).toEqual([])
  })

  it('should return an empty array when given size is negative', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7, 8], -3)).toEqual([])
  })

  it('should handle size greater than array length', () => {
    expect(chunk([1, 2, 3, 4, 5, 6, 7, 8], 10)).toEqual([[1, 2, 3, 4, 5, 6, 7, 8]])
  })

  it('should return an array of chunks with float size', () => {
    expect(chunk([1, 2, 3, 4, 5, 6], 3.25)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ])
  })
})
