import { describe, expect, it } from 'vitest'
import { titlecase } from '..'
import { FalseSet, TrueSet, toBoolean } from './to-boolean'

const trueString = ['true', 't', 'yes', 'y', 'on', '1']
const trueStringVariations = [...trueString, ...trueString.map((v) => v.toUpperCase()), ...trueString.map(titlecase)]

const falseStrings = ['false', 'f', 'no', 'n', 'off', '0']
const falseStringsVariations = [...falseStrings, ...falseStrings.map((v) => v.toUpperCase()), ...falseStrings.map(titlecase)]

const randomValues = ['foo', Symbol('foo'), new Date(), /foo/, [], {}]

const nonStrictBoolNumbers = [2, 3, 4, 5, 6, 7, 8, 9]

const customTrueValues = ['yessir', 'yup', 'yep']
const customFalseValues = ['nope', 'nah', 'howaboutno']

describe('toBoolean', () => {
  it.each(trueStringVariations)('should convert %s to true', (val) => {
    expect(toBoolean(val, { trueValues: TrueSet.full, falseValues: TrueSet.full })).toBe(true)
  })

  it.each(falseStringsVariations)('should convert %s to false', (val) => {
    expect(toBoolean(val)).toBe(false)
  })

  it.each(randomValues)('should convert %s to false', (val) => {
    expect(toBoolean(val)).toBe(false)
  })

  it('should convert true to true', () => {
    expect(toBoolean(true)).toBe(true)
  })

  it('should convert false to false', () => {
    expect(toBoolean(false)).toBe(false)
  })

  it('should convert 1 to true', () => {
    expect(toBoolean(1)).toBe(true)
  })

  it('should convert 0 to false', () => {
    expect(toBoolean(0)).toBe(false)
  })

  it('should convert "1" to false', () => {
    expect(toBoolean('1')).toBe(false)
  })

  it('should convert "0" to false', () => {
    expect(toBoolean('0')).toBe(false)
  })

  it('should convert "true" to false', () => {
    expect(toBoolean('true')).toBe(true)
  })

  it('should convert "false" to false', () => {
    expect(toBoolean('false')).toBe(false)
  })

  it.each(nonStrictBoolNumbers)('should convert %s to false', (val) => {
    expect(toBoolean(val)).toBe(false)
  })

  it.each(trueStringVariations)('should convert %s to true in strict mode', (val) => {
    expect(toBoolean(val, { strict: true, trueValues: TrueSet.full })).toBe(true)
  })

  it.each(falseStringsVariations)('should convert %s to false in strict mode', (val) => {
    expect(toBoolean(val, { strict: true, falseValues: FalseSet.full })).toBe(false)
  })

  it.each(nonStrictBoolNumbers)('should throw for %s in strict mode', (val) => {
    expect(() => toBoolean(val, { strict: true })).toThrow()
  })

  it.each(['foo'])('should throw for %s in strict mode', (val) => {
    expect(() => toBoolean(val, { strict: true })).toThrow()
  })

  it.each(customTrueValues)('should convert %s to true with custom trueValues', (val) => {
    expect(toBoolean(val, { trueValues: customTrueValues })).toBe(true)
  })

  it.each(trueString)('should convert %s to false with custom trueValues', (val) => {
    expect(toBoolean(val, { trueValues: customTrueValues })).toBe(false)
  })

  it.each(customFalseValues)('should convert %s to false with custom falseValues', (val) => {
    expect(toBoolean(val, { falseValues: customFalseValues })).toBe(false)
  })

  it.each(falseStrings)('should convert %s to false with custom falseValues', (val) => {
    expect(toBoolean(val, { falseValues: customFalseValues })).toBe(false)
  })

  it.each(falseStrings)('should throw for %s with custom falseValues in strict mode', (val) => {
    expect(() => toBoolean(val, { falseValues: customFalseValues, strict: true })).toThrow()
  })
})
