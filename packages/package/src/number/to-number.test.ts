import { describe, expect, it } from 'vitest'
import { toNumber } from './to-number'

describe('[number] toNumber', () => {
  it('converts int number', () => {
    const result = toNumber('123')
    expect(result).toBe(123)
  })

  it('converts float number', () => {
    const result = toNumber('123.45')
    expect(result).toBe(123.45)
  })

  it('convert number-like string', () => {
    const result = toNumber('123-foo')
    expect(result).toBe(undefined)
  })

  it('converts number-like float string', () => {
    const result = toNumber('123.456-foo')
    expect(result).toBe(undefined)
  })

  it('converts number-like string with default', () => {
    const result = toNumber('123-foo', 0)
    expect(result).toBe(0)
  })

  it('converts int number with default', () => {
    const result = toNumber('123', 456)
    expect(result).toBe(123)
  })

  it('converts float number with default', () => {
    const result = toNumber('123.45', 0)
    expect(result).toBe(123.45)
  })

  it('converts invalid number with default 0', () => {
    const result = toNumber('foo', 0)
    expect(result).toBe(0)
  })

  it('converts invalid number with default NaN', () => {
    const result = toNumber('foo', Number.NaN)
    expect(result).toBeNaN()
  })

  it('converts invalid number with default val', () => {
    const val = 'foo'
    const result = toNumber(val, val)
    expect(result).toBe('foo')
  })

  it('converts invalid number with default bar', () => {
    const result = toNumber('foo', 'bar')
    expect(result).toBe('bar')
  })

  it('converts invalid number with default null', () => {
    const result = toNumber('foo', null)
    expect(result).toBeNull()
  })

  it('converts invalid number with default undefined', () => {
    const result = toNumber('foo', undefined)
    expect(result).toBeUndefined()
  })

  it('converts invalid number with default false', () => {
    const result = toNumber('foo', false)
    expect(result).toBe(false)
  })

  it('converts invalid number with default 1', () => {
    const result = toNumber('foo', 1)
    expect(result).toBe(1)
  })
})
