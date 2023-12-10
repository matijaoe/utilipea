export * from './objects'
export * from './arrays'

export type Primitive = number | string | undefined | symbol | bigint | null

export type Falsy = null | undefined | false | '' | 0

export type NonPrimitive<T> = T extends Primitive ? never : T
export type NestedOmit<T> = {
  [K in keyof T]?: true | NestedOmit<NonPrimitive<T[K]>>;
}
