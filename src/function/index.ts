export * from './pipe'

export type Func<TArgs = any, KReturn = any | void> = (
  ...args: TArgs[]
) => KReturn
