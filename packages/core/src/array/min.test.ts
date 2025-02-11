import { describe, expect, it } from 'vitest'
import { min } from './min'

describe('min', () => {
  it('returns the min value from list of numbers', () => {
    const list = [5, 5, 10, 2]
    const result = min(list)
    expect(result).toEqual(2)
  })

  it('returns undefined for empty array', () => {
    const result = min([])
    expect(result).toEqual(undefined)
  })

  it('returns the min value from list of objects', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
      { game: 'c', score: 300 },
      { game: 'd', score: 400 },
      { game: 'e', score: 500 }
    ]
    const result = min(list, (x) => x.score)
    expect(result?.game).toEqual('a')
    expect(result?.score).toEqual(100)
  })
})
