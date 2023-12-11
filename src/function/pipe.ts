import type { Func } from '.'

export function pipe<A extends any[], B>(
  f1: (...args: A) => B,
): (...args: A) => B

export function pipe<A extends any[], B, C>(
  f1: (...args: A) => B,
  f2: Func<B, C>,
): (...args: A) => C

export function pipe<A extends any[], B, C, D>(
  f1: (...args: A) => B,
  f2: Func<B, C>,
  f3: Func<C, D>,
): (...args: A) => D

export function pipe<A extends any[], B, C, D, E>(
  f1: (...args: A) => B,
  f2: Func<B, C>,
  f3: Func<C, D>,
  f4: Func<D, E>,
): (...args: A) => E

export function pipe<A extends any[], B, C, D, E, F>(
  f1: (...args: A) => B,
  f2: Func<B, C>,
  f3: Func<C, D>,
  f4: Func<D, E>,
  f5: Func<E, F>,
): (...args: A) => F

export function pipe<A extends any[], B, C, D, E, F, G>(
  f1: (...args: A) => B,
  f2: Func<B, C>,
  f3: Func<C, D>,
  f4: Func<D, E>,
  f5: Func<E, F>,
  f6: Func<F, G>,
): (...args: A) => G

export function pipe<A extends any[], B, C, D, E, F, G, H>(
  f1: (...args: A) => B,
  f2: Func<B, C>,
  f3: Func<C, D>,
  f4: Func<D, E>,
  f5: Func<E, F>,
  f6: Func<F, G>,
  f7: Func<G, H>,
): (...args: A) => H

export function pipe<A extends any[], B, C, D, E, F, G, H, I>(
  f1: (...args: A) => B,
  f2: Func<B, C>,
  f3: Func<C, D>,
  f4: Func<D, E>,
  f5: Func<E, F>,
  f6: Func<F, G>,
  f7: Func<G, H>,
  f8: Func<H, I>,
): (...args: A) => I

export function pipe<A extends any[], B, C, D, E, F, G, H, I, J>(
  f1: (...args: A) => B,
  f2: Func<B, C>,
  f3: Func<C, D>,
  f4: Func<D, E>,
  f5: Func<E, F>,
  f6: Func<F, G>,
  f7: Func<G, H>,
  f8: Func<H, I>,
  f9: Func<I, J>,
): (...args: A) => J

// continue up to 12
export function pipe<A extends any[], B, C, D, E, F, G, H, I, J, K>(
  f1: (...args: A) => B,
  f2: Func<B, C>,
  f3: Func<C, D>,
  f4: Func<D, E>,
  f5: Func<E, F>,
  f6: Func<F, G>,
  f7: Func<G, H>,
  f8: Func<H, I>,
  f9: Func<I, J>,
  f10: Func<J, K>,
): (...args: A) => K

export function pipe<A extends any[], B, C, D, E, F, G, H, I, J, K, L>(
  f1: (...args: A) => B,
  f2: Func<B, C>,
  f3: Func<C, D>,
  f4: Func<D, E>,
  f5: Func<E, F>,
  f6: Func<F, G>,
  f7: Func<G, H>,
  f8: Func<H, I>,
  f9: Func<I, J>,
  f10: Func<J, K>,
  f11: Func<K, L>,
): (...args: A) => L

export function pipe<A extends any[], B, C, D, E, F, G, H, I, J, K, L, M>(
  f1: (...args: A) => B,
  f2: Func<B, C>,
  f3: Func<C, D>,
  f4: Func<D, E>,
  f5: Func<E, F>,
  f6: Func<F, G>,
  f7: Func<G, H>,
  f8: Func<H, I>,
  f9: Func<I, J>,
  f10: Func<J, K>,
  f11: Func<K, L>,
  f12: Func<L, M>,
): (...args: A) => M

export function pipe(valueOrFn: any, ...funcs: Function[]): any

export function pipe(...funcs: Function[]) {
  return (...args: any[]): any => {
    return funcs.slice(1).reduce((acc, fn) => fn(acc), funcs[0](...args))
  }
}
