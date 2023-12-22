/* eslint-disable unicorn/no-null */
import { describe, expect, it } from 'vitest'
import { sum } from './sum'

describe('sum', () => {
  it('array of numbers', () => {
    expect(sum([1, 2, 3, 4, 5])).toEqual(15)
  })

  it('single-element array', () => {
    expect(sum([42])).toEqual(42)
  })

  it('negative numbers', () => {
    expect(sum([1, -2, 3])).toEqual(2)
  })

  it('floating point numbers', () => {
    expect(sum([1.5, 2.5, 3.5])).toEqual(7.5)
  })

  it('is 0 when input is an empty array', () => {
    expect(sum([])).toBe(0)
  })

  it('accept a function to transform the input values', () => {
    expect(sum([1, 2, 3], (x) => x * x)).toEqual(14)
  })

  it('add list of objects correctly using getter fn', () => {
    const list = [{ value: 5 }, { value: 5 }, { value: 10 }, { value: 2 }]
    const result = sum(list, (x) => x.value)
    expect(result).toEqual(22)
  })

  it('gracefully handle null input list', () => {
    // @ts-expect-error
    const result = sum(null as unknown as readonly (number | object)[])
    expect(result).toEqual(0)
  })
})
