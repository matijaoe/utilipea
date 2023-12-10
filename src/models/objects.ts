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
