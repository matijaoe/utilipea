/**
 * Strict typed `Object.keys`
 *
 * @category Object
 */
export const objectKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<`${keyof T & (string | number | boolean | null | undefined)}`>
}
