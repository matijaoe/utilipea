/**
 * Deep clone an object, using `structuredClone`.
 *
 * @category Collection
 *
 * @example
 * const a = { foo: 'bar' }
 * const b = clone(a)
 *
 * a === b // false
 *
 * a.foo = 'baz'
 * console.log(a.foo) // baz
 * console.log(b.foo) // bar
 */
export const clone = structuredClone
