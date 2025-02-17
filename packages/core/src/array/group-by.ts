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
 * groupBy(fish, (f) => f.source)
 * // => { ocean: [{ name: 'Marlin', source: 'ocean' }], lake: [{ name: 'Bass', source: 'lake' }, { name: 'Trout', source: 'lake' }] }
 * 
 * @see [utilipea.vercel.app/array/groupBy.html](https://utilipea.vercel.app/array/groupBy.html)
 * 
 */
export const groupBy = <T, Key extends PropertyKey>(
  array: readonly T[],
  identity: (item: T) => Key
): Partial<Record<Key, T[]>> => {
  return array.reduce((acc, item) => {
    const groupId = identity(item)
    acc[groupId] ??= []
    acc[groupId].push(item)
    return acc
  }, {} as Record<Key, T[]>)
}
