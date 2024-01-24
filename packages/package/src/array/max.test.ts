import { describe, expect, it } from 'vitest'
import { max } from './max'

describe('max', () => {
  it('returns the max value from list of numbers', () => {
    const list = [5, 5, 10, 2]
    const result = max(list)
    expect(result).toEqual(10)
  })

  it('returns undefined for empty array', () => {
    const result = max([])
    expect(result).toEqual(undefined)
  })

  it('returns the max value from list of objects', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
      { game: 'c', score: 300 },
      { game: 'd', score: 400 },
      { game: 'e', score: 500 }
    ]
    const result = max(list, (x) => x.score)
    expect(result?.game).toEqual('e')
    expect(result?.score).toEqual(500)
  })
})
