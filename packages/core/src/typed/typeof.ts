import { toRawType } from '.'

export const typeOf = (val: any) => {
  if (val === null) {
    return 'null'
  }

  if (val !== Object(val)) {
    return typeof val
  }

  const result = toRawType(val).toLowerCase()

  // strip function adornments (e.g. "AsyncFunction")
  return result.includes('function') ? 'function' : result
}
