export const isWindow = (val: any): boolean => {
  // @ts-ignore
  return typeof window !== 'undefined' && toTypeString(val) === StandardObject.Window
}
