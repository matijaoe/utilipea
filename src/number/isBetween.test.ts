import { describe, expect, it } from 'vitest'
import { isBetween } from './isBetween'

describe('isBetween', () => {
  it('is true when value is between min and max', () => {
    expect(isBetween(3, [1, 5])).toBe(true)
    expect(isBetween(5, [1, 5])).toBe(true)
    expect(isBetween(3, { min: 1, max: 5 })).toBe(true)
    expect(isBetween(5, { min: 1, max: 5 })).toBe(true)
  })

  it('is false when value is not between min and max', () => {
    expect(isBetween(7, [1, 5])).toBe(false)
    expect(isBetween(7, { min: 1, max: 5 })).toBe(false)
  })

  it('is true when value is equal to min or max', () => {
    expect(isBetween(1, [1, 5])).toBe(true)
    expect(isBetween(5, [1, 5])).toBe(true)
    expect(isBetween(1, { min: 1, max: 5 })).toBe(true)
    expect(isBetween(5, { min: 1, max: 5 })).toBe(true)
  })

  it('is false when min is greater than max', () => {
    expect(isBetween(3, [5, 1])).toBe(false)
    expect(isBetween(3, { min: 5, max: 1 })).toBe(false)
  })
})
