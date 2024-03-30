import { describe, expect, it } from 'vitest'
import { count } from '.'

describe('count', () => {
  it('returns correct count per group', () => {
    const people = [
      { name: 'joe', sex: 'M' },
      { name: 'ben', sex: 'M' },
      { name: 'marie', sex: 'F' },
      { name: 'harry', sex: 'M' }
    ]
    const result = count(people, (p) => p.sex)
    expect(result).toEqual({
      M: 3,
      F: 1
    })

    const result2 = count(people, 'sex')
    expect(result2).toEqual(result)
  })
})
