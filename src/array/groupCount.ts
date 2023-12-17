/* TODO: as group but returns count as value */
export const groupCount = <T, TId extends PropertyKey>(
  list: readonly T[],
  identity: (item: T) => TId
) => {
  return list?.reduce((acc, item) => {
    const id = identity(item)
    acc[id] ??= 0
    acc[id] += 1
    return acc
  }, {} as Record<TId, number>)
}
