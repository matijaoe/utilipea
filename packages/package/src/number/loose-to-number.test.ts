import { describe, expect, it } from 'vitest'
import { looseToNumber } from './loose-to-number'

describe('[number] looseToNumber', () => {
  it('loosely converts int number', () => {
    const result = looseToNumber('123')
    expect(result).toBe(123)
  })

  it('loosely converts float number', () => {
    const result = looseToNumber('123.45')
    expect(result).toBe(123.45)
  })

  it('loosely convert number-like string', () => {
    const result = looseToNumber('123-foo')
    expect(result).toBe(123)
  })

  it('loosely convert number-like float string', () => {
    const result = looseToNumber('123.456-foo')
    expect(result).toBe(123.456)
  })

  it('loosely converts int number with default', () => {
    const result = looseToNumber('123', 456)
    expect(result).toBe(123)
  })

  it('loosely converts float number with default', () => {
    const result = looseToNumber('123.45', 0)
    expect(result).toBe(123.45)
  })

  it('loosely converts invalid number with default 0', () => {
    const result = looseToNumber('foo', 0)
    expect(result).toBe(0)
  })

  it('loosely converts invalid number with default NaN', () => {
    const result = looseToNumber('foo', Number.NaN)
    expect(result).toBeNaN()
  })

  it('loosely converts invalid number with default val', () => {
    const val = 'foo'
    const result = looseToNumber(val, val)
    expect(result).toBe('foo')
  })

  it('loosely converts invalid number with default bar', () => {
    const result = looseToNumber('foo', 'bar')
    expect(result).toBe('bar')
  })

  it('loosely converts invalid number with default null', () => {
    const result = looseToNumber('foo', null)
    expect(result).toBeNull()
  })

  it('loosely converts invalid number with default undefined', () => {
    const result = looseToNumber('foo', undefined)
    expect(result).toBeUndefined()
  })

  it('loosely converts invalid number with default false', () => {
    const result = looseToNumber('foo', false)
    expect(result).toBe(false)
  })

  it('loosely converts invalid number with default 1', () => {
    const result = looseToNumber('foo', 1)
    expect(result).toBe(1)
  })
})
