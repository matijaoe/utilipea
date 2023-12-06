import { describe, expect, it } from 'vitest'
import * as _ from '..'

describe('array module', () => {
  describe('unique', () => {
    it('correctly removed duplicate items', () => {
      const arr = [1, 2, 1, 3]
      const result = _.unique(arr)
      expect(result).toEqual([1, 2, 3])
    })

    it('uses key fn to correctly remove duplicate items', () => {
      const list = [
        { id: 1, name: 'joe' },
        { id: 2, name: 'dan' },
        { id: 3, name: 'joe' },
        { id: 4, name: 'mike' },
        { id: 5, name: 'hank' },
        { id: 6, name: 'rob' },
        { id: 7, name: 'mike' },
      ]
      const result = _.unique(list, (x) => x.name)
      expect(result).toEqual([
        { id: 1, name: 'joe' },
        { id: 2, name: 'dan' },
        { id: 4, name: 'mike' },
        { id: 5, name: 'hank' },
        { id: 6, name: 'rob' },
      ])
    })
  })
})
