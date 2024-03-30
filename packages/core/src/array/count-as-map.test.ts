import { describe, expect, it } from 'vitest'
import { countAsMap } from '.'

describe('countAsMap', () => {
  it('returns correct count per group', () => {
    const people = [
      { name: 'joe', sex: 'M' },
      { name: 'ben', sex: 'M' },
      { name: 'marie', sex: 'F' },
      { name: 'harry', sex: 'M' }
    ]
    const result = countAsMap(people, (p) => p.sex)
    expect(result).toEqual(new Map([
      ['M', 3],
      ['F', 1]
    ]))

    const result2 = countAsMap(people, 'sex')
    expect(result2).toEqual(result)
  })

  it('returns correct count per group as object by reference', () => {
    const maleObj = { label: 'male', value: 'M' }
    const people = [
      { name: 'joe', sex: maleObj },
      { name: 'ben', sex: maleObj },
      { name: 'marie', sex: { label: 'female', value: 'F' } },
      { name: 'harry', sex: maleObj }
    ]
    const result = countAsMap(people, (p) => p.sex)
    expect(result).toEqual(new Map([
      [maleObj, 3],
      [{ label: 'female', value: 'F' }, 1]
    ]))
  })
})
