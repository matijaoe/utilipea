/* eslint-disable prefer-regex-literals */
import { describe, expect, it } from 'vitest'
import { isEmpty } from './isEmpty'

describe('isEmpty', () => {
  it('should return true for null and undefined', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
  })

  it('should return true for booleans', () => {
    expect(isEmpty(true)).toBe(true)
    expect(isEmpty(false)).toBe(true)
  })

  it('should return true for numbers', () => {
    expect(isEmpty(0)).toBe(true)
    expect(isEmpty(1)).toBe(true)
    expect(isEmpty(-1)).toBe(true)
    expect(isEmpty(Number.NaN)).toBe(true)
    expect(isEmpty(Number.POSITIVE_INFINITY)).toBe(true)
    expect(isEmpty(Number.NEGATIVE_INFINITY)).toBe(true)
    expect(isEmpty(BigInt(0))).toBe(true)
    expect(isEmpty(BigInt(1))).toBe(true)
  })

  it('should return true for symbols', () => {
    expect(isEmpty(Symbol('test'))).toBe(true)
  })

  it('should return true for dates', () => {
    expect(isEmpty(new Date('2023-12-12'))).toBe(true)
    expect(isEmpty(new Date())).toBe(true)
  })

  it('should return true for regex', () => {
    expect(isEmpty(new RegExp('\d+'))).toBe(true)
    expect(isEmpty(new RegExp(''))).toBe(true)
    expect(isEmpty(/abc/)).toBe(true)
  })

  it('should return true for errors', () => {
    expect(isEmpty(new Error('yikes'))).toBe(true)
  })

  it('should return true for empty string', () => {
    expect(isEmpty('')).toBe(true)
  })

  it('should return false for non-empty string', () => {
    expect(isEmpty('hello')).toBe(false)
  })

  it('should return true for empty array', () => {
    expect(isEmpty([])).toBe(true)
  })

  it('should return false for non-empty array', () => {
    expect(isEmpty([1, 2, 3])).toBe(false)
  })

  it('should return true for empty Map & Set', () => {
    expect(isEmpty(new Map())).toBe(true)
    expect(isEmpty(new Set())).toBe(true)
  })

  it('should return false for non-empty Map & Set', () => {
    expect(isEmpty(new Map().set('key', 'value'))).toBe(false)
    expect(isEmpty(new Set().add('value'))).toBe(false)
  })

  it('should return true for empty object and function', () => {
    expect(isEmpty({})).toBe(true)
    expect(isEmpty(() => {})).toBe(true)
  })

  it('should return false for object and function with properties', () => {
    const obj = { prop: 'value' }
    expect(isEmpty(obj)).toBe(false)

    const func = () => {}
    func.prop = 'value'
    expect(isEmpty(func)).toBe(false)
  })

  it('should return true for object with symbol properties', () => {
    const obj = { [Symbol('prop')]: 'value' }
    expect(isEmpty(obj)).toBe(true)
  })

  it('should return false for object with symbol properties and regular keys', () => {
    const obj = { [Symbol('prop')]: 'value', key: 'value' }
    expect(isEmpty(obj)).toBe(false)
  })

  it('should return true for object with symbol properties with ignoreSymbols: false', () => {
    const obj = { [Symbol('prop')]: 'value' }
    expect(isEmpty(obj, { includeSymbols: true })).toBe(false)
  })

  it('should return false for instances of classes with properties', () => {
    class MyClass {
      constructor(public prop: number) {}
    }
    expect(isEmpty(new MyClass(1))).toBe(false)
  })
})
