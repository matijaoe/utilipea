import { describe, expect, it } from 'vitest'
import { shuffle } from './shuffle'

describe('shuffle', () => {
  it('single-element array', () => {
    expect(shuffle([42])).toEqual([42])
  })

  it('array of numbers', () => {
    expect(shuffle([1, -2, 3])).toEqual(expect.arrayContaining([1, 3, -2]))
  })

  it('array of strings', () => {
    expect(shuffle(['a', 'b', 'c'])).toEqual(expect.arrayContaining(['a', 'b', 'c']))
  })

  it('empty array', () => {
    expect(shuffle([])).toEqual([])
  })
})
