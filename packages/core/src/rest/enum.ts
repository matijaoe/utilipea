export type EnumType<T> = {
  [K in keyof T]: Readonly<T[K]>;
}[keyof T]
