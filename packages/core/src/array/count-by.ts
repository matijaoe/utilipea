/**
 * Count occurrences of an item in an array
 */
export const countBy = <T, TId extends PropertyKey>(
  list: readonly T[],
  identity: (item: T) => TId
) => {
  return list.reduce((acc, item) => {
    const id = identity(item)
    acc[id] ??= 0
    acc[id] += 1
    return acc
  }, {} as Record<TId, number>)
}
