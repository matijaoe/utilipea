/* eslint-disable unicorn/no-null */
import { describe, expect, expectTypeOf, it } from 'vitest'
import { toNumber } from './to-number'

describe('[number] toNumber', () => {
  it('convert string to int', () => {
    const result = toNumber('123')
    expect(result).toBe(123)
  })

  it('convert string to float', () => {
    const result = toNumber('123.45')
    expect(result).toBe(123.45)
  })

  it('convert number-like int string', () => {
    const result = toNumber('123-foo')
    expect(result).toBe(undefined)
  })

  it('convert number-like float string', () => {
    const result = toNumber('123.456-foo')
    expect(result).toBe(undefined)
  })

  it('convert number-like string with default', () => {
    const result = toNumber('123-foo', 0)
    expect(result).toBe(0)
  })

  it('convert number with default', () => {
    const result = toNumber(123, 456)
    expect(result).toBe(123)
  })

  it('convert valid numeric string with default', () => {
    const result = toNumber('123', 456)
    expect(result).toBe(123)
  })

  it('convert invalid string with default 0', () => {
    const result = toNumber('foo', 0)
    expect(result).toBe(0)
  })

  it('convert invalid number with default NaN', () => {
    const result = toNumber('foo', Number.NaN)
    expect(result).toBeNaN()
  })

  it('convert empty string to fallback', () => {
    const result = toNumber('')
    expect(result).toBe(undefined)
  })

  it('convert invalid number with default bar', () => {
    const result = toNumber('foo', 'bar')
    expect(result).toBe('bar')
  })

  it('convert invalid number with default null', () => {
    const result = toNumber('foo', null)
    expect(result).toBeNull()
  })

  it('convert invalid number with default undefined', () => {
    const result = toNumber('foo', undefined)
    expect(result).toBeUndefined()
  })

  it('convert invalid number with default false', () => {
    const result = toNumber('foo', false)
    expect(result).toBe(false)
  })

  it('convert invalid number with default 1', () => {
    const result = toNumber('foo', 1)
    expect(result).toBe(1)
  })

  // TODO: can't get it working to throw test error, so I rely on ts-expect error
  it('infer correct return type', () => {
    const result1 = toNumber('123', 0)
    // @ts-expect-error
    expectTypeOf(result1).not.toEqualTypeOf<number>()
    
    const result2 = toNumber('123')
    // @ts-expect-error
    expectTypeOf(result2).not.toEqualTypeOf<number | undefined>()

    const result3 = toNumber('test', null)
    // @ts-expect-error
    expectTypeOf(result3).not.toEqualTypeOf<number | null>()
  })
})
