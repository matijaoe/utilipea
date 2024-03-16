import type { PlainObject } from '..'
import { isDate, isMap, isPlainObject, isRegex, isSet, isTypedArray } from '..'

export const isEqual = (x: unknown, y: unknown): boolean => {
  if (Object.is(x, y)) {
    return true
  }

  if (typeof x !== typeof y) {
    return false
  }

  if (isDate(x) && isDate(y)) {
    return x.getTime() === y.getTime()
  }

  if (isRegex(x) && isRegex(y)) {
    return x.toString() === y.toString()
  }

  if (Array.isArray(x) && Array.isArray(y)) {
    return isEqualArray(x, y)
  }

  if (isPlainObject(x) && isPlainObject(y)) {
    return isEqualPlainObject(x, y)
  }

  if ((isMap(x) && isMap(y)) || (isSet(x) && isSet(y))) {
    return isEqualArray([...x], [...y])
  }

  if (x instanceof ArrayBuffer && y instanceof ArrayBuffer) {
    return isEqualDataView(new DataView(x), new DataView(y))
  }

  if (x instanceof DataView && y instanceof DataView) {
    return isEqualDataView(x, y)
  }

  if (isTypedArray(x) && isTypedArray(y)) {
    if (x.byteLength !== y.byteLength) {
      return false
    }
    return isEqualArray(x, y)
  }

  return false
}

// Helpers

const isEqualArray = <T>(x: T[] | TypedArray, y: T[] | TypedArray) => {
  if (x.length !== y.length) {
    return false
  }
  return x.every((el, idx) => isEqual(el, y[idx]))
}

const isEqualPlainObject = (x: PlainObject, y: PlainObject) => {
  const keysX = Reflect.ownKeys(x)
  const keysY = Reflect.ownKeys(y)

  if (!isEqual(keysX, keysY)) {
    return false
  }

  for (const key of keysX) {
    if (!Reflect.has(y, key)) {
      return false
    }
    if (!isEqual(x[key], y[key])) {
      return false
    }
  }

  return true
}

const isEqualDataView = (a: DataView, b: DataView) => {
  if (a.byteLength !== b.byteLength) { return false }
  for (let offset = 0; offset < a.byteLength; offset++) {
    if (a.getUint8(offset) !== b.getUint8(offset)) {
      return false
    }
  }
  return true
}
