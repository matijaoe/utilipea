/**
 * Sorts an array of items into groups. The return value is a map where the keys are
 * the group ids the given getGroupId function produced and the value is an array of
 * each item in that group.
 *
 * @example
 * const fish = [
 *  { name: 'Marlin', source: 'ocean' },
 *  { name: 'Bass', source: 'lake' },
 *  { name: 'Trout', source: 'lake' }
 * ]
 * group(fish, (f) => f.source)
 * // => { ocean: [{ name: 'Marlin', source: 'ocean' }], lake: [{ name: 'Bass', source: 'lake' }, { name: 'Trout', source: 'lake' }] }
 * 
 * @see 
 * [utilipea.vercel.app/array/group.html](https://utilipea.vercel.app/array/group.html)
 */
export const group = <T, TKey extends PropertyKey>(
  array: readonly T[],
  identity: (item: T) => TKey
): Partial<Record<TKey, T[]>> => {
  return array.reduce((acc, item) => {
    const groupId = identity(item)
    acc[groupId] ??= []
    acc[groupId].push(item)
    return acc
  }, {} as Record<TKey, T[]>)
}

// TODO: group with cmp, and groupBy with identity
