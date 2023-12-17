import { describe, expect, it } from 'vitest'
import { toBoolean } from './toBoolean'

describe('toBoolean', () => {
  it('should convert 1 to true', () => {
    expect(toBoolean(1)).toBe(true)
  })

  it('should convert 0 to false', () => {
    expect(toBoolean(0)).toBe(false)
  })

  it('should convert "1" to true', () => {
    expect(toBoolean('1')).toBe(true)
  })

  it('should convert "0" to false', () => {
    expect(toBoolean('0')).toBe(false)
  })

  it('should convert "true" to true', () => {
    expect(toBoolean('true')).toBe(true)
  })

  it('should convert "false" to false', () => {
    expect(toBoolean('false')).toBe(false)
  })

  it('should convert "t" to true', () => {
    expect(toBoolean('t')).toBe(true)
  })

  it('should convert "f" to false', () => {
    expect(toBoolean('f')).toBe(false)
  })

  it('should convert "yes" to true', () => {
    expect(toBoolean('yes')).toBe(true)
  })

  it('should convert "no" to false', () => {
    expect(toBoolean('no')).toBe(false)
  })

  it('should convert "y" to true', () => {
    expect(toBoolean('y')).toBe(true)
  })

  it('should convert "n" to false', () => {
    expect(toBoolean('n')).toBe(false)
  })

  it('should convert "on" to true', () => {
    expect(toBoolean('on')).toBe(true)
  })

  it('should convert "off" to false', () => {
    expect(toBoolean('off')).toBe(false)
  })

  it('should convert "true" to true', () => {
    expect(toBoolean('true')).toBe(true)
  })

  it('should convert "false" to false', () => {
    expect(toBoolean('false')).toBe(false)
  })

  it('should convert "TRUE" to true', () => {
    expect(toBoolean('TRUE')).toBe(true)
  })

  it('should convert "FALSE" to false', () => {
    expect(toBoolean('FALSE')).toBe(false)
  })

  it('should convert "True" to true', () => {
    expect(toBoolean('True')).toBe(true)
  })

  it('should return false for non-boolean', () => {
    expect(toBoolean('foo')).toBe(false)
  })

  it('should return false for number 2', () => {
    expect(toBoolean('2')).toBe(false)
  })

  // try strict option
  it('should convert "true" to true in strict mode', () => {
    expect(toBoolean('True', { strict: true })).toBe(true)
  })

  it('should convert "false" to false in strict mode', () => {
    expect(toBoolean('False', { strict: true })).toBe(false)
  })

  it('should throw an error for number 2 in strict mode', () => {
    expect(() => toBoolean('2', { strict: true })).toThrow()
  })

  it('should throw an error in strict mode', () => {
    expect(() => toBoolean('foo', { strict: true })).toThrow()
  })
})
