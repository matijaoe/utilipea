export const unique = <T, K extends string | number | symbol>(
  arr: Array<T>,
  toKey?: (item: T) => K
) => {
  if (!toKey) {
    return [...new Set(arr)]
  }

  const valueMap = arr.reduce((acc, item) => {
    const key = toKey(item)
    acc[key] ??= item
    return acc
  }, {} as Record<string | number | symbol, T>)

  return Object.values(valueMap)
}
