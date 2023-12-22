/* eslint-disable */
import { describe, expect, it } from 'vitest'
import { isEqual } from '.'

describe('isEqual', () => {
  it('numbers', () => {
    expect(isEqual(1, 1)).toBe(true)
    expect(isEqual(1, 2)).toBe(false)
  })

  it('strings', () => {
    expect(isEqual('a', 'a')).toBe(true)
    expect(isEqual('a', 'b')).toBe(false)
  })

  it('booleans', () => {
    expect(isEqual(true, true)).toBe(true)
    expect(isEqual(true, false)).toBe(false)
  })

  it('null', () => {
    expect(isEqual(null, null)).toBe(true)
    expect(isEqual(null, undefined)).toBe(false)
  })

  it('undefined', () => {
    expect(isEqual(undefined, undefined)).toBe(true)
    expect(isEqual(undefined, null)).toBe(false)
  })

   
  it('NaN', () => {
    expect(isEqual(Number.NaN, Number.NaN)).toBe(true)
    expect(isEqual(Number.NaN, 1)).toBe(false)
  })

  it('symbols', () => {
    const a = Symbol('a')
    const b = Symbol('b')
    expect(isEqual(a, a)).toBe(true)
    expect(isEqual(a, Symbol('a'))).toBe(false)
    expect(isEqual(a, b)).toBe(false)
  })

  it('objects', () => {
    expect(isEqual({ a: 1 }, { a: 1 })).toBe(true)
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false)
  })

  it('dates', () => {
    expect(isEqual(new Date(1), new Date(1))).toBe(true)
    expect(isEqual(new Date(1), new Date(2))).toBe(false)
  })

  it('arrays', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true)
    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false)
  })

  it('maps', () => {
    expect(isEqual(new Map([[1, 2]]), new Map([[1, 2]]))).toBe(true)
    expect(isEqual(new Map([[1, 2]]), new Map([[1, 3]]))).toBe(false)
    expect(isEqual(new Map([[{ id: 1 }, 2]]), new Map([[{ id: 1 }, 2]]))).toBe(true)
    expect(isEqual(new Map([[{ id: 1 }, 2]]), new Map([[{ id: 2 }, 2]]))).toBe(false)
  })

  it('sets', () => {
    expect(isEqual(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(true)
    expect(isEqual(new Set([1, 2, 3, 2, 3, 2]), new Set([1, 2, 3]))).toBe(true)
    expect(isEqual(new Set([1, 2, 3]), new Set([1, 2, 4]))).toBe(false)
  })

  it('nested objects', () => {
    expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true)
    expect(isEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false)
  })

  it('nested arrays', () => {
    expect(isEqual([[1], [2], [3]], [[1], [2], [3]])).toBe(true)
    expect(isEqual([[1], [2], [3]], [[1], [2], [4]])).toBe(false)
  })

  it('nested objects and arrays', () => {
    expect(isEqual({ a: { b: [1] } }, { a: { b: [1] } })).toBe(true)
    expect(isEqual({ a: { b: [1] } }, { a: { b: [2] } })).toBe(false)
  })

  it('objects with different keys', () => {
    expect(isEqual({ a: 1 }, { b: 1 })).toBe(false)
  })

  it('arrays with different lengths', () => {
    expect(isEqual([1, 2, 3], [1, 2])).toBe(false)
  })

  const testFunction = () => { return 1 }
  it('functions', () => {
    expect(isEqual(() => { return 1 }, () => { return 2 })).toBe(false)
    expect(isEqual(testFunction, testFunction)).toBe(true)
  })

  it('objects with functions', () => {
    expect(isEqual({ a: () => 1 }, { a: () => 1 })).toBe(false)
    expect(isEqual({ a: testFunction }, { a: testFunction })).toBe(true)
  })

  it('regExp', () => {
    expect(isEqual(/a(.*)/, /a(.*)/)).toBe(true)
    expect(isEqual(/a/, /b.*/)).toBe(false)
  })

  it('deepEquals with Error objects', () => {
    const error1 = new Error('test error')
    const error2 = new Error('test error')
    expect(isEqual(error1, error1)).toBe(true)
    expect(isEqual(error1, error2)).toBe(false)
  })

  it('array buffers', () => {
    const buffer1 = new ArrayBuffer(2)
    const buffer1View = new Uint8Array(buffer1)
    buffer1View.set([42, 43])

    const buffer2 = new ArrayBuffer(2)
    const buffer2View = new Uint8Array(buffer2)
    buffer2View.set([42, 43])

    const buffer3 = new ArrayBuffer(2)
    const buffer3View = new Uint8Array(buffer3)
    buffer3View.set([42, 44])

    const buffer4 = new ArrayBuffer(3)

    expect(isEqual(buffer1, buffer2)).toBe(true)
    expect(isEqual(buffer1, buffer3)).toBe(false)
    expect(isEqual(buffer1, buffer4)).toBe(false)
  })

  it('typed arrays', () => {
    expect(isEqual(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 3]))).toBe(true)
    expect(isEqual(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2]))).toBe(false)
    expect(isEqual(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 4]))).toBe(false)
  })

  it('data views', () => {
    const buffer1 = new ArrayBuffer(2)
    const buffer2 = new ArrayBuffer(2)
    const buffer3 = new ArrayBuffer(3)

    const view1 = new DataView(buffer1)
    const view2 = new DataView(buffer2)
    const view3 = new DataView(buffer3)

    view1.setUint8(0, 42)
    view1.setUint8(1, 43)

    view2.setUint8(0, 42)
    view2.setUint8(1, 43)

    expect(isEqual(view1, view2)).toBe(true)
    expect(isEqual(view1, view3)).toBe(false)
  })
})
