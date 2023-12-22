/* eslint-disable ts/no-unsafe-argument */
/* eslint-disable ts/no-unsafe-return */
import type { Func } from '..'
import { isFunction } from '..'

export function pipe<A extends any[], B>(f1: (...args: A) => B): (...args: A) => B
export function pipe<A, B>(value: A, f1: Func<A, B>): B
export function pipe<A extends any[], B, C>(f1: (...args: A) => B, f2: Func<B, C>): (...args: A) => C
export function pipe<A, B, C>(value: A, f1: Func<A, B>, f2: Func<B, C>): C
export function pipe<A extends any[], B, C, D>(f1: (...args: A) => B, f2: Func<B, C>, f3: Func<C, D>): (...args: A) => D
export function pipe<A, B, C, D>(value: A, f1: Func<A, B>, f2: Func<B, C>, f3: Func<C, D>): D
export function pipe<A extends any[], B, C, D, E>(f1: (...args: A) => B, f2: Func<B, C>, f3: Func<C, D>, f4: Func<D, E>): (...args: A) => E
export function pipe<A, B, C, D, E>(value: A, f1: Func<A, B>, f2: Func<B, C>, f3: Func<C, D>, f4: Func<D, E>): E
export function pipe<A extends any[], B, C, D, E, F>(f1: (...args: A) => B, f2: Func<B, C>, f3: Func<C, D>, f4: Func<D, E>, f5: Func<E, F>): (...args: A) => F
export function pipe<A, B, C, D, E, F>(value: A, f1: Func<A, B>, f2: Func<B, C>, f3: Func<C, D>, f4: Func<D, E>, f5: Func<E, F>): F
export function pipe<A extends any[], B, C, D, E, F, G>(f1: (...args: A) => B, f2: Func<B, C>, f3: Func<C, D>, f4: Func<D, E>, f5: Func<E, F>, f6: Func<F, G>): (...args: A) => G
export function pipe<A, B, C, D, E, F, G>(value: A, f1: Func<A, B>, f2: Func<B, C>, f3: Func<C, D>, f4: Func<D, E>, f5: Func<E, F>, f6: Func<F, G>): G
export function pipe<A extends any[], B, C, D, E, F, G, H>(f1: (...args: A) => B, f2: Func<B, C>, f3: Func<C, D>, f4: Func<D, E>, f5: Func<E, F>, f6: Func<F, G>, f7: Func<G, H>): (...args: A) => H
export function pipe<A, B, C, D, E, F, G, H>(value: A, f1: Func<A, B>, f2: Func<B, C>, f3: Func<C, D>, f4: Func<D, E>, f5: Func<E, F>, f6: Func<F, G>, f7: Func<G, H>): H
export function pipe<A extends any[], B, C, D, E, F, G, H, I>(f1: (...args: A) => B, f2: Func<B, C>, f3: Func<C, D>, f4: Func<D, E>, f5: Func<E, F>, f6: Func<F, G>, f7: Func<G, H>, f8: Func<H, I>): (...args: A) => I
export function pipe<A, B, C, D, E, F, G, H, I>(value: A, f1: Func<A, B>, f2: Func<B, C>, f3: Func<C, D>, f4: Func<D, E>, f5: Func<E, F>, f6: Func<F, G>, f7: Func<G, H>, f8: Func<H, I>): I
export function pipe<A extends any[], B, C, D, E, F, G, H, I, J>(f1: (...args: A) => B, f2: Func<B, C>, f3: Func<C, D>, f4: Func<D, E>, f5: Func<E, F>, f6: Func<F, G>, f7: Func<G, H>, f8: Func<H, I>, f9: Func<I, J>): (...args: A) => J
export function pipe<A, B, C, D, E, F, G, H, I, J>(value: A, f1: Func<A, B>, f2: Func<B, C>, f3: Func<C, D>, f4: Func<D, E>, f5: Func<E, F>, f6: Func<F, G>, f7: Func<G, H>, f8: Func<H, I>, f9: Func<I, J>): J

export function pipe(valueOrFn: Function | Exclude<any, Func>, ...funcs: Function[]): any

export function pipe(valueOrFn: Function | Exclude<any, Func>, ...funcs: Function[]): any {
  if (isFunction(valueOrFn)) {
    return (...args: any[]) => {
      return funcs.reduce((acc, fn) => fn(acc), (valueOrFn as Function)(...args))
    }
  }
  return funcs.reduce((acc, fn) => fn(acc), valueOrFn as Exclude<any, Func>)
}
