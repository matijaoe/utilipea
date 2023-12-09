import { isArray, isFunction, isMap, isNil, isSet, isString } from '..'

export const isEmpty = (val: unknown, opts?: { includeSymbols: boolean }) => {
  if (isNil(val)) {
    return true
  }

  if (isString(val) || isArray(val)) {
    return val.length === 0
  }

  if (isMap(val) || isSet(val)) {
    return val.size === 0
  }

  if (ArrayBuffer.isView(val)) {
    return val.byteLength === 0
  }

  if (typeof val === 'object' || isFunction(val)) {
    const keysLen = Object.keys(val as any).length
    if (opts?.includeSymbols) {
      const symbolsLen = Object.getOwnPropertySymbols(val as any).length
      return keysLen === 0 && symbolsLen === 0
    }
    return keysLen === 0
  }

  return true
}
