import { assertType, describe, expect, it } from 'vitest'
import * as _ from '..'
import { typesDataProvider } from './types-data-provider'

describe('typed module', () => {
  describe('isArray', () => {
    it('returns false for null', () => {
      const result = _.isArray(null)
      expect(result).toBe(false)
    })
    it('returns false for undefined', () => {
      const result = _.isArray(undefined)
      expect(result).toBe(false)
    })
    it('returns false for boolean', () => {
      const result = _.isArray(false)
      expect(result).toBe(false)
    })
    it('returns false for object', () => {
      const result = _.isArray({})
      expect(result).toBe(false)
    })
    it('returns false for class instance', () => {
      class Data {}
      const result = _.isArray(new Data())
      expect(result).toBe(false)
    })
    it('returns false for number', () => {
      const result = _.isArray(22)
      expect(result).toBe(false)
    })
    it('returns false for string', () => {
      const result = _.isArray('abc')
      expect(result).toBe(false)
    })
    it('returns true for array', () => {
      const result = _.isArray([1, 2, 3])
      expect(result).toBe(true)
    })
    it('returns true for empty array', () => {
      const result = _.isArray([])
      expect(result).toBe(true)
    })
    it('returns true for Array contructor', () => {
      // eslint-disable-next-line ts/no-array-constructor
      const result = _.isArray(new Array())
      expect(result).toBe(true)
    })
    it('should work as type guard', () => {
      const data = typesDataProvider('array')
      if (_.isArray(data)) {
        expect(Array.isArray(data)).toEqual(true)
        assertType<Array<number>>(data)
      }

      const data1: unknown = typesDataProvider('array')
      if (_.isArray(data1)) {
        assertType<ReadonlyArray<unknown>>(data1)
      }
    })
  })

  describe('isObject', () => {
    it('returns false for null', () => {
      const result = _.isObject(null)
      expect(result).toBe(false)
    })
    it('returns false for undefined', () => {
      const result = _.isObject(undefined)
      expect(result).toBe(false)
    })
    it('returns false for boolean', () => {
      const result = _.isObject(false)
      expect(result).toBe(false)
    })
    it('returns false for', () => {
      const result = _.isObject(() => {})
      expect(result).toBe(false)
    })
    it('returns false for class instance', () => {
      class Data {}
      const result = _.isObject(new Data())
      expect(result).toBe(false)
    })
    it('returns false for Object.create(null)', () => {
      const result = _.isObject(Object.create(null))
      expect(result).toBe(false)
    })
    it('returns false for number', () => {
      const result = _.isObject(22)
      expect(result).toBe(false)
    })
    it('returns false for string', () => {
      const result = _.isObject('abc')
      expect(result).toBe(false)
    })
    it('returns false for array', () => {
      const result = _.isObject([1, 2, 3])
      expect(result).toBe(false)
    })
    it('returns true for object', () => {
      const result = _.isObject({})
      expect(result).toBe(true)
    })
    it('should work as type guard', () => {
      const data = { a: 'asd' }
      if (_.isObject(data)) {
        expect(typeof data).toEqual('object')
        assertType<{ a: string }
      >(data)
      }
    })
    it('should also work as type guard', () => {
      const data = { data: 5 } as ReadonlyArray<number> | { data: 5 }
      if (_.isObject(data)) {
        expect(typeof data).toEqual('object')
        assertType<{
          data: 5
          // TODO
          // @ts-ignore until more robust guard implemented
        }>(data)
      }
    })
    it('should work as type guard for more narrow types', () => {
      const data = { data: 5 } as Array<number> | { data: number }
      if (_.isObject(data)) {
        expect(typeof data).toEqual('object')
        assertType<{
          data: number
          // TODO
          // @ts-ignore: until more robust guard implemented
        }>(data)
      }
    })
    it('should work even if data type is unknown', () => {
      const data: unknown = typesDataProvider('object')
      if (_.isObject(data)) {
        expect(typeof data).toEqual('object')
        assertType<Record<string, unknown>>(data)
      }
    })
  })

  describe('isPrimitive', () => {
    it('returns true for all the primitives', () => {
      const arr = [
        1.1,
        'There is no second best',
        false,
        Symbol('key'),
        BigInt('1'),
        undefined,
        null
      ]

      arr.forEach((item) => {
        expect(_.isPrimitive(item)).toBe(true)
      })
    })
    it('returns false for non-primitives', () => {
      const arr = [new Date(), Number, {}, Object({}), () => 0, [1, 2]]

      for (const elm of arr) {
        expect(_.isPrimitive(elm)).toBe(false)
      }
    })
  })

  describe('isFunction', () => {
    it('returns false for null', () => {
      const result = _.isFunction(null)
      expect(result).toBe(false)
    })
    it('returns false for undefined', () => {
      const result = _.isFunction(undefined)
      expect(result).toBe(false)
    })
    it('returns false for boolean', () => {
      const result = _.isFunction(false)
      expect(result).toBe(false)
    })
    it('returns false for class instance', () => {
      class Data {}
      const result = _.isFunction(new Data())
      expect(result).toBe(false)
    })
    it('returns false for number', () => {
      const result = _.isFunction(22)
      expect(result).toBe(false)
    })
    it('returns false for string', () => {
      const result = _.isFunction('abc')
      expect(result).toBe(false)
    })
    it('returns false for array', () => {
      const result = _.isFunction([1, 2, 3])
      expect(result).toBe(false)
    })
    it('returns false for object', () => {
      const result = _.isFunction({})
      expect(result).toBe(false)
    })
    it('returns true for anonymous', () => {
      const result = _.isFunction(() => {
        return 'hello'
      })
      expect(result).toBe(true)
    })
    it('returns true for arrow', () => {
      const result = _.isFunction(() => {
        return 'hello'
      })
      expect(result).toBe(true)
    })
    it('returns true for named', () => {
      function sayHello() {
        return 'hello'
      }
      const result = _.isFunction(sayHello)
      expect(result).toBe(true)
    })
    it('isFunction: should work as type guard', () => {
      const data = typesDataProvider('null')
      if (_.isFunction(data)) {
        expect(data).toEqual(null)
        assertType<() => void>(data)
      }

      let maybeFunction: string | ((a: number) => string) | undefined
      if (_.isFunction(maybeFunction)) {
        maybeFunction(1)
        assertType<(a: number) => string>(maybeFunction)
      }
    })
    it('isFunction: should work as type guard in filter', () => {
      const data = [
        typesDataProvider('error'),
        typesDataProvider('array'),
        typesDataProvider('function'),
        typesDataProvider('function'),
        typesDataProvider('object'),
        typesDataProvider('number'),
      ].filter(_.isFunction)
      expect(data.every((c) => typeof c === 'function')).toEqual(true)
      assertType<Array<() => void>>(data)
    })
  })

  describe('isString', () => {
    it('returns false for null', () => {
      const result = _.isString(null)
      expect(result).toBe(false)
    })
    it('returns false for undefined', () => {
      const result = _.isString(undefined)
      expect(result).toBe(false)
    })
    it('returns false for boolean', () => {
      const result = _.isString(false)
      expect(result).toBe(false)
    })
    it('returns false for class instance', () => {
      class Data {}
      const result = _.isString(new Data())
      expect(result).toBe(false)
    })
    it('returns false for number', () => {
      const result = _.isString(22)
      expect(result).toBe(false)
    })
    it('returns false for array', () => {
      const result = _.isString([1, 2, 3])
      expect(result).toBe(false)
    })
    it('returns false for object', () => {
      const result = _.isString({})
      expect(result).toBe(false)
    })
    it('returns true for string', () => {
      const result = _.isString('abc')
      expect(result).toBe(true)
    })
    it('returns true for string class', () => {
      const result = _.isString(String('abc'))
      expect(result).toBe(true)
    })
    it('returns true for empty string', () => {
      const result = _.isString('')
      expect(result).toBe(true)
    })
  })

  describe('isNumber', () => {
    it('returns false for null', () => {
      const result = _.isNumber(null)
      expect(result).toBe(false)
    })
    it('returns false for undefined', () => {
      const result = _.isNumber(undefined)
      expect(result).toBe(false)
    })
    it('returns false for boolean', () => {
      const result = _.isNumber(false)
      expect(result).toBe(false)
    })
    it('returns false for class instance', () => {
      class Data {}
      const result = _.isNumber(new Data())
      expect(result).toBe(false)
    })
    it('returns true for int', () => {
      const result = _.isNumber(22)
      expect(result).toBe(true)
    })
    it('returns true for float', () => {
      const result = _.isNumber(22.0567)
      expect(result).toBe(true)
    })
    it('returns true for Infinity', () => {
      const result = _.isNumber(Number.POSITIVE_INFINITY)
      expect(result).toBe(true)
    })
    it('returns false for NaN', () => {
      const result = _.isNumber(Number.NaN)
      expect(result).toBe(false)
    })
    it('returns false for array', () => {
      const result = _.isNumber([1, 2, 3])
      expect(result).toBe(false)
    })
    it('returns false for object', () => {
      const result = _.isNumber({})
      expect(result).toBe(false)
    })
    it('returns false for string', () => {
      const result = _.isNumber('abc')
      expect(result).toBe(false)
    })
    it('returns false for string class', () => {
      const result = _.isNumber(String('abc'))
      expect(result).toBe(false)
    })
  })

  describe('isInt', () => {
    class Data {}

    const falseValues = [undefined, null, false, new Data(), Number.NaN, [1, 2, 3], {}, 'abc', '123abc', String('abc')]
    it('returns false for non-number values', () => {
      falseValues.forEach((value) => {
        expect(_.isInt(value)).toBe(false)
      })
    })

    it('returns false for float', () => {
      expect(_.isInt(22.0567)).toBe(false)
    })

    it('returns true for int', () => {
      expect(_.isInt(22)).toBe(true)
    })
  })

  describe('isFloat function', () => {
    class Data {}

    const falseValues = [undefined, null, false, new Data(), Number.NaN, [1, 2, 3], {}, 'abc', '123.23abc', String('abc'), 22]
    it('returns false for non-number values', () => {
      falseValues.forEach((value) => {
        expect(_.isFloat(value)).toBe(false)
      })
    })

    it('returns false for int', () => {
      expect(_.isFloat(22)).toBe(false)
    })

    it('returns true for float', () => {
      expect(_.isFloat(22.0567)).toBe(true)
    })
  })

  describe('isDate', () => {
    it('return true for Date values', () => {
      expect(_.isDate(new Date())).toBe(true)
      expect(_.isDate(new Date('2022-09-01T02:19:55.976Z'))).toBe(true)
      expect(_.isDate(new Date('invalid value'))).toBe(true)
    })

    it('return false for non-Date values', () => {
      expect(_.isDate(22)).toBe(false)
      expect(_.isDate({ name: 'x' })).toBe(false)
      expect(_.isDate('abc')).toBe(false)
      expect(_.isDate(String('abc'))).toBe(false)
      expect(_.isDate([1, 2, 3])).toBe(false)
      expect(_.isDate(() => {})).toBe(false)
      expect(_.isDate(() => {})).toBe(false)
      expect(_.isDate(Symbol(''))).toBe(false)
      expect(_.isDate(Symbol('hello'))).toBe(false)
    })
  })

  describe('isPromise', () => {
    it('return true for Promise values', () => {
      expect(_.isPromise(new Promise((res) => res(0)))).toBe(true)
      expect(_.isPromise(new Promise((res) => res('')))).toBe(true)
      expect(_.isPromise((async () => {})())).toBe(true)
    })

    it('return false for non-Promise values', () => {
      expect(_.isPromise(22)).toBe(false)
      expect(_.isPromise({ name: 'x' })).toBe(false)
      expect(_.isPromise('abc')).toBe(false)
      expect(_.isPromise(String('abc'))).toBe(false)
      expect(_.isPromise([1, 2, 3])).toBe(false)
      expect(_.isPromise(() => {})).toBe(false)
      expect(_.isPromise(() => {})).toBe(false)
      expect(_.isPromise(Symbol(''))).toBe(false)
      expect(_.isPromise(Symbol('hello'))).toBe(false)
      expect(_.isPromise({ then: 2 })).toBe(false)
    })
  })

  describe('isSymbol', () => {
    it('returns false for non-Symbol values', () => {
      expect(_.isSymbol(null)).toBe(false)
      expect(_.isSymbol(undefined)).toBe(false)
      expect(_.isSymbol(new (class Data {})())).toBe(false)
      expect(_.isSymbol(new (class Data { name: string = 'ray' })())).toBe(false)
      expect(_.isSymbol(22)).toBe(false)
      expect(_.isSymbol(0)).toBe(false)
      expect(_.isSymbol([1, 2, 3])).toBe(false)
      expect(_.isSymbol([])).toBe(false)
      expect(_.isSymbol(true)).toBe(false)
      expect(_.isSymbol(false)).toBe(false)
      expect(_.isSymbol({})).toBe(false)
      expect(_.isSymbol({ name: 'x' })).toBe(false)
      expect(_.isSymbol('abc')).toBe(false)
      expect(_.isSymbol('')).toBe(false)
      expect(_.isSymbol(new Map())).toBe(false)
      expect(_.isSymbol(new Map().set('a', 1).set('b', 2).set('c', 3))).toBe(false)
    })

    it('returns true for Symbol values', () => {
      expect(_.isSymbol(Symbol(''))).toBe(true)
      expect(_.isSymbol(Symbol('hello'))).toBe(true)
    })
  })

  describe('isBoolean', () => {
    it('should work as type guard', () => {
      const data = typesDataProvider('boolean')
      if (_.isBoolean(data)) {
        expect(typeof data).toEqual('boolean')
        assertType<boolean>(data)
      }

      const data1: unknown = typesDataProvider('boolean')
      if (_.isBoolean(data1)) {
        expect(typeof data1).toEqual('boolean')
        assertType<boolean>(data1)
      }

      const data2: any = typesDataProvider('boolean')
      if (_.isBoolean(data2)) {
        expect(typeof data2).toEqual('boolean')
        assertType<boolean>(data2)
      }
    })
    it('should work as type guard in filter', () => {
      const data = [
        typesDataProvider('error'),
        typesDataProvider('array'),
        typesDataProvider('function'),
        typesDataProvider('null'),
        typesDataProvider('array'),
        typesDataProvider('boolean'),
      ].filter(_.isBoolean)
      expect(data.every((c) => typeof c === 'boolean')).toEqual(true)
      assertType<Array<boolean>>(data)
    })
  })

  describe('isDefined', () => {
    it('return true for defined values', () => {
      expect(_.isDefined('')).toBe(true)
      expect(_.isDefined(0)).toBe(true)
    })
    it('return false for non-defined values', () => {
      expect(_.isDefined(undefined)).toBe(false)
      expect(_.isDefined(null)).toBe(false)
    })
  })

  describe('isNonNull', () => {
    it('return true for non-null values', () => {
      expect(_.isNonNull(undefined)).toBe(true)
      expect(_.isNonNull('')).toBe(true)
      expect(_.isNonNull(0)).toBe(true)
    })
    it('return false for null values', () => {
      expect(_.isDefined(null)).toBe(false)
    })
  })

  describe('isNil', () => {
    it('return true for nil values', () => {
      expect(_.isNil(null)).toBe(true)
      expect(_.isNil(undefined)).toBe(true)
    })
    it('return false for non-nil values', () => {
      expect(_.isNil('')).toBe(false)
      expect(_.isNil(0)).toBe(false)
    })
  })

  describe('isNull', () => {
    it('returns false for non-null', () => {
      expect(_.isNull('')).toBe(false)
      expect(_.isNull(0)).toBe(false)
      expect(_.isNull(undefined)).toBe(false)
    })
    it('returns true for null', () => {
      expect(_.isNull(null)).toBe(true)
    })
  })

  describe('isUndefined', () => {
    it('returns false for non-undefined', () => {
      expect(_.isUndefined('')).toBe(false)
      expect(_.isUndefined(0)).toBe(false)
      expect(_.isUndefined(null)).toBe(false)
    })
    it('returns true for undefined', () => {
      expect(_.isUndefined(undefined)).toBe(true)
    })
  })

  describe('isTruthy', () => {
    it('returns false for falsy', () => {
      expect(_.isTruthy('')).toBe(false)
      expect(_.isTruthy(0)).toBe(false)
      expect(_.isTruthy(undefined)).toBe(false)
      expect(_.isTruthy(null)).toBe(false)
    })
    it('returns true for truthy', () => {
      expect(_.isTruthy('hello')).toBe(true)
      expect(_.isTruthy([])).toBe(true)
      expect(_.isTruthy({})).toBe(true)
      expect(_.isTruthy(1)).toBe(true)
      expect(_.isTruthy(true)).toBe(true)
    })
  })
})
