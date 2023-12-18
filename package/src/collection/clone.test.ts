import { describe, expect, it } from 'vitest'
import { clone } from './clone'

describe('[collection] clone', () => {
  describe('deep clone objects', () => {
    it('clones shallow object', () => {
      const obj = { a: 1, b: 'foo', c: true, d: new Date(2013, 11, 25) }
      const cloned = clone(obj)
      obj.b = 'bar'
      obj.c = false
      obj.d.setDate(31)
      expect(obj).toEqual({ a: 1, b: 'bar', c: false, d: new Date(2013, 11, 31) })
      expect(cloned).toEqual({ a: 1, b: 'foo', c: true, d: new Date(2013, 11, 25) })
      expect(obj).not.toBe(cloned)
    })

    it('clones deep object', () => {
      const obj = { a: { b: { c: 'foo' } } }
      const cloned = clone(obj)
      obj.a.b.c = 'bar'
      expect(cloned).toEqual({ a: { b: { c: 'foo' } } })
      expect(obj).not.toBe(cloned)
    })

    it('clones objects with circular references', () => {
      const x: any = { c: null }
      const y = { a: x }
      const z = { b: y }
      x.c = z
      const cloned = clone(x)
      expect(x).not.toBe(cloned)
      expect(x.c).not.toBe(cloned.c)
      expect(x.c.b).not.toBe(cloned.c.b)
      expect(x.c.b.a).not.toBe(cloned.c.b.a)
      expect(x.c.b.a.c).not.toBe(cloned.c.b.a.c)
      expect(Object.keys(cloned)).toEqual(Object.keys(x))
      expect(Object.keys(cloned.c)).toEqual(Object.keys(x.c))
      expect(Object.keys(cloned.c.b)).toEqual(Object.keys(x.c.b))
      expect(Object.keys(cloned.c.b.a)).toEqual(Object.keys(x.c.b.a))
      expect(Object.keys(cloned.c.b.a.c)).toEqual(Object.keys(x.c.b.a.c))

      x.c.b = 1
      expect(cloned.c.b).not.toEqual(x.c.b)
    })
  })

  describe('deep clone arrays', () => {
    it('clones shallow arrays', () => {
      const list = [1, 2, 3]
      const cloned = clone(list)
      list.pop()
      expect(cloned).toEqual([1, 2, 3])
    })

    it('clones deep arrays', () => {
      const list: any = [1, [1, 2, 3], [[[5]]]]
      const cloned = clone(list)

      expect(list).not.toBe(cloned)
      expect(list[2]).not.toBe(cloned[2])
      expect(list[2][0]).not.toBe(cloned[2][0])

      expect(cloned).toEqual([1, [1, 2, 3], [[[5]]]])
    })
  })

  describe('built-in types', () => {
    it('clones Date object', () => {
      const date = new Date(2014, 10, 14, 23, 59, 59, 999)

      const cloned = clone(date)

      expect(date).not.toBe(cloned)
      expect(cloned).toEqual(new Date(2014, 10, 14, 23, 59, 59, 999))

      expect(cloned.getDay()).toBe(5) // friday
    })

    it('clones RegExp object', () => {
      [/x/, /x/g, /x/i, /x/m, /x/gi, /x/gm, /x/im, /x/gim].forEach((pattern) => {
        const cloned = clone(pattern)
        expect(cloned).not.toBe(pattern)
        expect(cloned.constructor).toBe(RegExp)
        expect(cloned.source).toBe(pattern.source)
        expect(cloned.global).toBe(pattern.global)
        expect(cloned.ignoreCase).toBe(pattern.ignoreCase)
        expect(cloned.multiline).toBe(pattern.multiline)
      })
    })
  })

  describe('deep clone deep nested mixed objects', () => {
    it('clones array with objects', () => {
      const list: any = [{ a: { b: 1 } }, [{ c: { d: 1 } }]]
      const cloned = clone(list)
      list[1][0] = null
      expect(cloned).toEqual([{ a: { b: 1 } }, [{ c: { d: 1 } }]])
    })

    it('clones array with arrays', () => {
      const list: Array<Array<any>> = [[1], [[3]]]
      const cloned = clone(list)
      list[1][0] = null
      expect(cloned).toEqual([[1], [[3]]])
    })

    it('clones array with mutual ref object', () => {
      const obj = { a: 1 }
      const list = [{ b: obj }, { b: obj }]
      const cloned = clone(list)

      expect(list[0].b).toBe(list[1].b)
      expect(cloned[0].b).toBe(cloned[1].b)
      expect(cloned[0].b).not.toBe(list[0].b)
      expect(cloned[1].b).not.toBe(list[1].b)

      expect(cloned[0].b).toEqual({ a: 1 })
      expect(cloned[1].b).toEqual({ a: 1 })

      obj.a = 2
      expect(cloned[0].b).toEqual({ a: 1 })
      expect(cloned[1].b).toEqual({ a: 1 })
    })
  })

  describe('deep clone edge cases', () => {
    it('nulls, undefineds and empty objects and arrays', () => {
      expect(clone(null)).toBe(null)
      expect(clone(undefined)).toBe(undefined)
      expect(clone(undefined)).not.toBe(null)

      const obj = {}
      expect(clone(obj)).not.toBe(obj)

      const list: any = []
      expect(clone(list)).not.toBe(list)
    })
  })
})
