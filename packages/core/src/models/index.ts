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
 * This type builds an array with an exact length.
 *
 * @example
 * let arr: ArrayExactLength<number, 3> = [1, 2, 3];
 * // => OK
 *
 * arr = [1, 2];
 * // => Type '[number, number]' is not assignable to type '[number, number, number]'.
 *
 * @template TElem The type of the array elements.
 * @template TLength The exact length of the array.
 */
export type ArrayExactLength<TElem, TLength extends number> = BuildArrayExactLength<TElem, TLength>

type BuildArrayExactLength<
  TElem,
  TLength extends number,
  TArray extends Array<TElem> = []
> = TArray['length'] extends TLength
  ? TArray
  : BuildArrayExactLength<TElem, TLength, [...TArray, TElem]>

/**
 * This type builds an array with an max length.
 *
 * @example
 * let arr: ArrayMaxLength<number, 2> = [1, 2];
 * // => OK
 *
 * arr = [1];
 * // => OK
 * 
 * arr = [1, 2, 3];
 * // => Type '[number, number, number]' is not assignable to type '[] | [number] | [number, number]'
 *
 * @template TElem The type of the array elements.
 * @template TLength The exact length of the array.
 */
export type ArrayMaxLength<TElem, TMaxLength extends number> = BuildArrayMaxLength<TElem, TMaxLength>

type BuildArrayMaxLength<
  TElem,
  TMaxLength extends number,
  TArray extends Array<TElem> = []
> = TArray['length'] extends TMaxLength
  ? TArray
  : TArray | BuildArrayMaxLength<TElem, TMaxLength, [...TArray, TElem]>
  
export type ArrayExactLengths<TElem, TLengths extends number[]> = 
  TLengths[number] extends infer TLength
    ? TLength extends number
      ? ArrayExactLength<TElem, TLength>
      : never
    : never

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

export type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array

export type Func<TArgs = any, KReturn = any | void> = (
  ...args: TArgs[]
) => KReturn

type ByPropertyGetter<T, K = PropertyKey> = (item: T) => K
type KeysPointingToPropertyKey<T, V = PropertyKey> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T]

export type ByIdentity<T, K = PropertyKey> = ByPropertyGetter<T, K> | KeysPointingToPropertyKey<T, K>

export type CompareFn<TArrays extends ArrayMinLength<unknown[], 2>> = (a: TArrays[0][number], b: ArrayTail<TArrays>[number][number]) => boolean
export type ArrayTail<TArray extends unknown[]> = TArray extends [unknown, ...infer U] ? U : never
