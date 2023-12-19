import { describe, expect, it } from 'vitest'
import { omit } from './omit'

describe('omit', () => {
  it('removes specified keys from an object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(omit(obj, 'a', 'c')).toEqual({ b: 2 })
  })

  it('does not mutate the original object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(omit(obj, 'a', 'c')).not.toBe(obj)
  })

  it('returns an empty object if all keys are omitted', () => {
    const obj = { a: 1, b: 2, c: 3 }

    expect(omit(obj, 'a', 'b', 'c')).toEqual({})
  })

  it('returns the original object if no keys are specified', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(omit(obj)).toBe(obj)
  })
})
