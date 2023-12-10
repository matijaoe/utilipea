import { describe, expect, it } from 'vitest'
import { clamp } from './clamp'

describe('clamp', () => {
  it('clamp a number between a minimum and maximum value', () => {
    expect(clamp(3, 1, 5)).toEqual(3)
    expect(clamp(-3, -5, -1)).toEqual(-3)
  })

  it('clamp a number over maximum value', () => {
    expect(clamp(7, 1, 5)).toEqual(5)
    expect(clamp(-7, -5, -1)).toEqual(-5)
  })

  it('clamp a number under minimum value', () => {
    expect(clamp(0, 1, 5)).toEqual(1)
    expect(clamp(-10, -5, -1)).toEqual(-5)
  })

  // max and min the same value
  it('clamp a number between the same minimum and maximum value', () => {
    expect(clamp(3, 1, 1)).toEqual(1)
    expect(clamp(-3, -1, -1)).toEqual(-1)
  })

  it('throw an error when max is less than min', () => {
    expect(() => clamp(3, 5, 1)).toThrowError('max must be greater than min')
  })
})
