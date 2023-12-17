/**
 * Convert an array to a dictionary by mapping each item
 * into a dictionary key & value
 */
export const objectify = <T, Key extends PropertyKey, Value = T>(
  array: readonly T[],
  getKey: (item: T) => Key,
  getValue?: (item: T) => Value
): Record<Key, Value> => {
  getValue ??= (v: any) => v
  return array.reduce((acc, item) => {
    acc[getKey(item)] = getValue!(item)
    return acc
  }, {} as Record<Key, Value>)
}

const fish = [
  {
    name: 'Marlin',
    weight: 105
  },
  {
    name: 'Bass',
    weight: 8
  },
  {
    name: 'Trout',
    weight: 13
  }
]

console.log(objectify(fish, (f) => f.name)) // => { Marlin: [marlin object], Bass: [bass object], ... }
console.log(objectify(
  fish,
  (f) => f.name,
  (f) => f.weight
))// => { Marlin: 105, Bass: 8, Trout: 13 }
