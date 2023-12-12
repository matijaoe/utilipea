export * from './pipe'
export * from './pipeAsync'

export type Func<TArgs = any, KReturn = any | void> = (
  ...args: TArgs[]
) => KReturn
