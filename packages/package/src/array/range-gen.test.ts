import { describe, expect, it } from 'vitest'
import { rangeGen } from './range-gen'
import { toList } from '.'

describe('[array] rangeGen', () => {
  const obj = {
    name: 'bob'
  }

  it('yields expected values', () => {
    expect(toList(rangeGen(3))).toEqual([0, 1, 2])
    expect(toList(rangeGen(0, 3))).toEqual([0, 1, 2, 3])
    expect(toList(rangeGen(0, 3, 2))).toEqual([0, 2])
    expect(toList(rangeGen(0, 3, 1, 'y'))).toEqual(['y', 'y', 'y', 'y'])
    expect(toList(rangeGen(0, 3, 1, () => 'y'))).toEqual(['y', 'y', 'y', 'y'])
    expect(toList(rangeGen(0, 3, 1, (i) => i))).toEqual([0, 1, 2, 3])
    expect(toList(rangeGen(0, 3, 1, (i) => `y${i}`))).toEqual([
      'y0',
      'y1',
      'y2',
      'y3'
    ])
    expect(toList(rangeGen(0, 3, 1, obj))).toEqual([obj, obj, obj, obj])
    expect(toList(rangeGen(0, 6, 2, (i) => i))).toEqual([0, 2, 4, 6])
  })
})
