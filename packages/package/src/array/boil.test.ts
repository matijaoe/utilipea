import { describe, expect, it } from 'vitest'
import { boil } from '.'

describe('boil', () => {
  it('compares and keeps item based on condition', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
      { game: 'c', score: 300 },
      { game: 'd', score: 400 },
      { game: 'e', score: 500 }
    ]
    const result = boil(list, (a, b) => (a.score > b.score ? a : b))
    expect(result?.game).toEqual('e')
    expect(result?.score).toEqual(500)
  })

  it('does not fail when provided array is empty', () => {
    const result = boil([], () => true)
    expect(result).toEqual(undefined)
  })
})
