/**
 * Convert an array to a dictionary by mapping each item
 * into a dictionary key & value
 * 
 * @see [utilipea.vercel.app/array/objectify.html](https://utilipea.vercel.app/array/objectify.html)
 * 
 */
export const objectify = <T, Key extends PropertyKey, Value = T>(
  array: readonly T[],
  getKey: (item: T) => Key,
  getValue?: (item: T) => Value
): Record<Key, Value> => {
  getValue ??= (v: T) => v as unknown as Value
  return array.reduce((acc, item) => {
    acc[getKey(item)] = getValue!(item)
    return acc
  }, {} as Record<Key, Value>)
}
