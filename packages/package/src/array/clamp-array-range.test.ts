import { describe, expect, it } from 'vitest'
import { clampArrayRange } from '.'

describe('clampArrayRange', () => {
  it('should clamp array range', () => {
    const arr = [1, 2, 3, 4]
    expect(clampArrayRange(0, arr)).toEqual(0)
    expect(clampArrayRange(1, arr)).toEqual(1)
    expect(clampArrayRange(2, arr)).toEqual(2)
    expect(clampArrayRange(3, arr)).toEqual(3)
    expect(clampArrayRange(4, arr)).toEqual(3)
    expect(clampArrayRange(-1, arr)).toEqual(0)
  })
})
