export const isObjectType = (val: unknown): val is object => {
  return typeof val === 'object'
}
