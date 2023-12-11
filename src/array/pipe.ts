export type Func<TArgs = any, KReturn = any | void> = (
  ...args: TArgs[]
) => KReturn

export const pipe = (...funcs: Func[]) => {
  return (...args: any[]) => {
    return funcs.slice(1).reduce((acc, fn) => fn(acc), funcs[0](...args))
  }
}
