import { assertType, describe, expect, it } from 'vitest'
import { typesDataProvider } from './tests/types-data-provider'
import * as _ from './typed'

describe('typed module', () => {
  describe('isArray', () => {
    it('returns false for non-array values', () => {
      class Data {}

      const nonArrayValues = [
        null,
        undefined,
        false,
        {},
        new Data(),
        22,
        'abc'
      ]

      nonArrayValues.forEach((value) => {
        const result = _.isArray(value)
        expect(result).toBe(false)
      })
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
    it('returns false for non-object values', () => {
      const nonObjectValues = [
        null,
        undefined,
        false,
        22,
        'abc',
        [1, 2, 3]
      ]

      nonObjectValues.forEach((value) => {
        const result = _.isObject(value)
        expect(result).toBe(false)
      })
    })

    it('returns false for non-plain objects', () => {
      class Data {}

      const values = [
        () => {},
        new Data(),
        Object.create(null),
      ]

      values.forEach((value) => {
        const result = _.isObject(value)
        expect(result).toBe(false)
      })
    })

    it('returns true for new Object', () => {
      // eslint-disable-next-line no-new-object
      const result = _.isObject(new Object())
      expect(result).toBe(true)
    })

    it('returns true for plain object', () => {
      const result = _.isObject({})
      expect(result).toBe(true)
    })

    // TODO: i dont even know if type guards work

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

    const arr = [
      new Date(),
      Number,
      {},
      Object({}),
      () => 0,
      [1, 2]
    ]

    arr.forEach((elm) => {
      expect(_.isPrimitive(elm)).toBe(false)
    })
  })

  describe('isFunction', () => {
    it('returns false for non-functions', () => {
      class Data {}

      const nonFunctionValues = [
        null,
        undefined,
        false,
        new Data(),
        22,
        'abc',
        [1, 2, 3],
        {}
      ]

      nonFunctionValues.forEach((value) => {
        const result = _.isFunction(value)
        expect(result).toBe(false)
      })
    })

    it('returns true for anonymous function', () => {
      const result = _.isFunction(() => {
        return 'hello'
      })
      expect(result).toBe(true)
    })

    it('returns true for named arrow function', () => {
      const sayHello = () => {
        return 'hello'
      }
      const result = _.isFunction(sayHello)
      expect(result).toBe(true)
    })

    it('returns true for named function', () => {
      function sayHello() {
        return 'hello'
      }
      const result = _.isFunction(sayHello)
      expect(result).toBe(true)
    })

    it('should work as type guard', () => {
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
  })

  describe('isString', () => {
    it('returns false for non-string values', () => {
      class Data {}

      const nonStringValues = [
        null,
        undefined,
        false,
        new Data(),
        22,
        [1, 2, 3],
        {}
      ]

      nonStringValues.forEach((value) => {
        const result = _.isString(value)
        expect(result).toBe(false)
      })
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
    it('returns false for non-number values', () => {
      class Data {}

      const nonNumberValues = [
        null,
        undefined,
        false,
        new Data(),
        [1, 2, 3],
        {},
        'abc',
        String('abc')
      ]

      nonNumberValues.forEach((value) => {
        const result = _.isNumber(value)
        expect(result).toBe(false)
      })
    })

    it('returns false for NaN', () => {
      const result = _.isNumber(Number.NaN)
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
  })

  describe('isInt', () => {
    class Data {}

    const falseValues = [
      undefined,
      null,
      false,
      new Data(),
      Number.NaN,
      [1, 2, 3],
      {},
      'abc',
      '123abc',
      String('abc')
    ]

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

    const falseValues = [
      undefined,
      null,
      false,
      new Data(),
      Number.NaN,
      [1, 2, 3],
      {},
      'abc',
      '123.23abc',
      String('abc'),
      22
    ]

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

  describe('isDef', () => {
    it('return true for defined values', () => {
      expect(_.isDef('')).toBe(true)
      expect(_.isDef(0)).toBe(true)
    })

    it('return false for undefined', () => {
      expect(_.isDef(undefined)).toBe(false)
    })

    it('return false for null', () => {
      expect(_.isDef(null)).toBe(false)
    })
  })

  describe('notNull', () => {
    it('return true for non-null values', () => {
      expect(_.notNull(undefined)).toBe(true)
      expect(_.notNull('')).toBe(true)
      expect(_.notNull(0)).toBe(true)
    })

    it('return false for null', () => {
      expect(_.isDef(null)).toBe(false)
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
    it('returns false for non-null values', () => {
      expect(_.isNull('')).toBe(false)
      expect(_.isNull(0)).toBe(false)
      expect(_.isNull(undefined)).toBe(false)
      expect(_.isNull(false)).toBe(false)
      expect(_.isNull(Object.create(null))).toBe(false)
    })

    it('returns true for null values', () => {
      expect(_.isNull(null)).toBe(true)
    })
  })

  describe('isUndefined', () => {
    it('returns false for non-undefined values', () => {
      expect(_.isUndefined('')).toBe(false)
      expect(_.isUndefined(0)).toBe(false)
      expect(_.isUndefined(null)).toBe(false)
    })

    it('returns true for undefined', () => {
      expect(_.isUndefined(undefined)).toBe(true)
    })
  })

  describe('isTruthy', () => {
    it('returns false for falsy values', () => {
      expect(_.isTruthy('')).toBe(false)
      expect(_.isTruthy(0)).toBe(false)
      expect(_.isTruthy(undefined)).toBe(false)
      expect(_.isTruthy(null)).toBe(false)
      expect(_.isTruthy(false)).toBe(false)
    })

    it('returns true for truthy values', () => {
      expect(_.isTruthy('hello')).toBe(true)
      expect(_.isTruthy([])).toBe(true)
      expect(_.isTruthy({})).toBe(true)
      expect(_.isTruthy(1)).toBe(true)
      expect(_.isTruthy(true)).toBe(true)
    })
  })
})
