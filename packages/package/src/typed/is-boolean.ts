export const isBoolean = (val: unknown): val is boolean => {
  return typeof val === 'boolean'
}
