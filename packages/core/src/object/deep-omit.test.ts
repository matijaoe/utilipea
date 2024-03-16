/* eslint-disable unicorn/no-null */
import { describe, expect, it } from 'vitest'
import { deepOmit } from './deep-omit'

describe('deepOmit', () => {
  it('removes specified keys from an object', () => {
    const obj = { a: 1, b: { c: 2, d: 3 } }
    expect(deepOmit(obj, { a: true, b: { c: true } })).toEqual({ b: { d: 3 } })
  })

  it('does not mutate the original object', () => {
    const obj = { a: 1, b: { c: 2, d: 3 } }
    expect(deepOmit(obj, { a: true, b: { c: true } })).not.toBe(obj)
  })

  it('return an empty object if all root keys are omitted', () => {
    const obj = { a: 1, b: { c: 2, d: 3 } }
    expect(deepOmit(obj, { a: true, b: true })).toStrictEqual({})
  })

  it('should return an empty object if the input is falsy', () => {
    expect(deepOmit(null as any, { a: true })).toEqual({})
    expect(deepOmit(undefined as any, { a: true })).toEqual({})
    expect(deepOmit(false as any, { a: true })).toEqual({})
    expect(deepOmit(0 as any, { a: true })).toEqual({})
    expect(deepOmit('' as any, { a: true })).toEqual({})
  })

  it('returns the original object if no keys are specified', () => {
    const obj = { a: 1, b: { c: 2, d: 3 } }
    expect(deepOmit(obj, {})).toStrictEqual(obj)
  })
})
