// TODO: neatly organize this dump
const StandardBuiltInObject = {
  Array: '[object Array]',
  ArrayBuffer: '[object ArrayBuffer]',
  Boolean: '[object Boolean]',
  Date: '[object Date]',
  Error: '[object Error]',
  Function: '[object Function]',
  Generator: '[object Generator]',
  GeneratorFunction: '[object GeneratorFunction]',
  Map: '[object Map]',
  Number: '[object Number]',
  Object: '[object Object]',
  Promise: '[object Promise]',
  RegExp: '[object RegExp]',
  Set: '[object Set]',
  String: '[object String]',
  Symbol: '[object Symbol]',
  WeakMap: '[object WeakMap]',
  WeakSet: '[object WeakSet]',
} as const

const OtherBuiltInObject = {
  BigInt: '[object BigInt]',
  DataView: '[object DataView]',
  JSON: '[object JSON]',
  Math: '[object Math]',
  Proxy: '[object Proxy]',
} as const

const GlobalValue = {
  global: '[object global]', // Node.js
  Window: '[object Window]', // Browsers
  globalThis: '[object globalThis]',
} as const

export const StandardObject = {
  ...StandardBuiltInObject,
  ...OtherBuiltInObject,
  ...GlobalValue,
} as const

export type StandardObjectModel = typeof StandardObject[keyof typeof StandardObject]

export type PlainObject = Record<PropertyKey, any>

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys]

export type Primitive = number | string | undefined | symbol | bigint | null

export type Falsy = null | undefined | false | '' | 0

export type NonPrimitive<T> = T extends Primitive ? never : T
export type NestedOmit<T> = {
  [K in keyof T]?: true | NestedOmit<NonPrimitive<T[K]>>;
}

/**
 * This type builds an array with a minimum length.
 *
 * @example
 * let arr: ArrayMinLength<number, 3> = [1, 2, 3];
 * // => OK
 *
 * arr = [1, 2];
 * // => Type '[number, number]' is not assignable to type '[number, number, number, ...number[]]'.
 *
 * @template TElem The type of the array elements.
 * @template TMinLength The minimum length of the array.
 */

export type ArrayMinLength<TElem, TMinLength extends number> = BuildArrayMinLength<TElem, TMinLength, []>

type BuildArrayMinLength<
    TElem,
    TMinLength extends number,
    Current extends TElem[]
> = Current['length'] extends TMinLength
  ? [...Current, ...TElem[]]
  : BuildArrayMinLength<TElem, TMinLength, [...Current, TElem]>

/**
 * Promise, or maybe not
 */
export type Awaitable<T> = T | PromiseLike<T>

/**
 * Null or whatever
 */
export type Nullable<T> = T | null | undefined

/**
 * Array, or not yet
 */
export type Arrayable<T> = T | Array<T>

export type DefinitelyArray<T> = Extract<
  T,
  Array<any> | ReadonlyArray<any>
> extends never
  ? ReadonlyArray<unknown>
  : Extract<T, Array<any> | ReadonlyArray<any>>
export type DefinitelyFunction<T> = Extract<T, Function> extends never
  ? Function
  : Extract<T, Function>
