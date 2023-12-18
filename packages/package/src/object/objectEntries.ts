/**
 * Strict typed `Object.entries`
 *
 * @category Object
 */
export const objectEntries = <T extends object>(obj: T) => {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>
}
