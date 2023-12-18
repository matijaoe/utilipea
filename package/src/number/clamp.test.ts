import { describe, expect, it } from 'vitest'
import { clamp } from './clamp'

describe('clamp', () => {
  it('number over min value', () => {
    expect(clamp(3, { min: 1 })).toEqual(3)
    expect(clamp(-3, { min: -5 })).toEqual(-3)
  })

  it('number under max value', () => {
    expect(clamp(3, { max: 7 })).toEqual(3)
    expect(clamp(-3, { max: 7 })).toEqual(-3)
  })

  it('number between a min and max value', () => {
    expect(clamp(3, { min: 1, max: 7 })).toEqual(3)
    expect(clamp(-3, { min: -1, max: 7 })).toEqual(-1)

    expect(clamp(3, [1, 7])).toEqual(3)
    expect(clamp(-3, [-1, 7])).toEqual(-1)
  })

  it('number under min and max value', () => {
    expect(clamp(0, { min: 1, max: 7 })).toEqual(1)
    expect(clamp(9, { min: 1, max: 7 })).toEqual(7)

    expect(clamp(0, [1, 7])).toEqual(1)
    expect(clamp(9, [-1, 7])).toEqual(7)
  })

  it('number under min value', () => {
    expect(clamp(-3, { min: 1 })).toEqual(1)
    expect(clamp(3, { min: 5 })).toEqual(5)
  })

  it('number over max value', () => {
    expect(clamp(10, { max: 5 })).toEqual(5)
    expect(clamp(-3, { max: -5 })).toEqual(-5)
  })

  it('min more than max', () => {
    expect(() => clamp(10, { min: 5, max: 1 })).toThrow()
    expect(() => clamp(10, [5, 1])).toThrow()
  })

  it('same min and max', () => {
    expect(clamp(10, { min: 5, max: 5 })).toEqual(5)

    expect(clamp(10, [5, 5])).toEqual(5)
  })
})
