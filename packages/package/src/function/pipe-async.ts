/* eslint-disable ts/no-unsafe-argument */
/* eslint-disable ts/no-unsafe-return */
import type { Func } from '..'
import { isFunction, isPromise } from '..'

type MaybePromise<T> = T | Promise<T>
type MaybeAsyncFunc<T, R> = Func<T, MaybePromise<R>>

export function pipeAsync<A extends any[], B>(f1: (...args: A) => MaybePromise<B> | B): (...args: A) => MaybePromise<B>
export function pipeAsync<A, B>(value: A, f1: Func<A, MaybePromise<B> | B>): MaybePromise<B>
export function pipeAsync<A extends any[], B, C>(f1: (...args: A) => MaybePromise<B> | B, f2: Func<B, MaybePromise<C> | C>): (...args: A) => MaybePromise<C>
export function pipeAsync<A, B, C>(value: A, f1: Func<A, MaybePromise<B> | B>, f2: Func<B, MaybePromise<C> | C>): MaybePromise<C>
export function pipeAsync<A extends any[], B, C, D>(f1: (...args: A) => MaybePromise<B> | B, f2: Func<B, MaybePromise<C> | C>, f3: Func<C, MaybePromise<D> | D>): (...args: A) => MaybePromise<D>
export function pipeAsync<A, B, C, D>(value: A, f1: Func<A, MaybePromise<B> | B>, f2: Func<B, MaybePromise<C> | C>, f3: Func<C, MaybePromise<D> | D>): MaybePromise<D>
export function pipeAsync<A extends any[], B, C, D, E>(f1: (...args: A) => MaybePromise<B> | B, f2: Func<B, MaybePromise<C> | C>, f3: Func<C, MaybePromise<D> | D>, f4: Func<D, MaybePromise<E> | E>): (...args: A) => MaybePromise<E>
export function pipeAsync<A, B, C, D, E>(value: A, f1: Func<A, MaybePromise<B> | B>, f2: Func<B, MaybePromise<C> | C>, f3: Func<C, MaybePromise<D> | D>, f4: Func<D, MaybePromise<E> | E>): MaybePromise<E>
export function pipeAsync<A extends any[], B, C, D, E, F>(f1: (...args: A) => MaybePromise<B> | B, f2: Func<B, MaybePromise<C> | C>, f3: Func<C, MaybePromise<D> | D>, f4: Func<D, MaybePromise<E> | E>, f5: Func<E, MaybePromise<F> | F>): (...args: A) => MaybePromise<F>
export function pipeAsync<A, B, C, D, E, F>(value: A, f1: Func<A, MaybePromise<B> | B>, f2: Func<B, MaybePromise<C> | C>, f3: Func<C, MaybePromise<D> | D>, f4: Func<D, MaybePromise<E> | E>, f5: Func<E, MaybePromise<F> | F>): MaybePromise<F>
export function pipeAsync<A extends any[], B, C, D, E, F, G>(f1: (...args: A) => MaybePromise<B> | B, f2: Func<B, MaybePromise<C> | C>, f3: Func<C, MaybePromise<D> | D>, f4: Func<D, MaybePromise<E> | E>, f5: Func<E, MaybePromise<F> | F>, f6: Func<F, MaybePromise<G> | G>): (...args: A) => MaybePromise<G>
export function pipeAsync<A, B, C, D, E, F, G>(value: A, f1: Func<A, MaybePromise<B> | B>, f2: Func<B, MaybePromise<C> | C>, f3: Func<C, MaybePromise<D> | D>, f4: Func<D, MaybePromise<E> | E>, f5: Func<E, MaybePromise<F> | F>, f6: Func<F, MaybePromise<G> | G>): MaybePromise<G>
export function pipeAsync<A extends any[], B, C, D, E, F, G, H>(f1: (...args: A) => MaybePromise<B> | B, f2: Func<B, MaybePromise<C> | C>, f3: Func<C, MaybePromise<D> | D>, f4: Func<D, MaybePromise<E> | E>, f5: Func<E, MaybePromise<F> | F>, f6: Func<F, MaybePromise<G> | G>, f7: Func<G, MaybePromise<H> | H>): (...args: A) => MaybePromise<H>
export function pipeAsync<A, B, C, D, E, F, G, H>(value: A, f1: Func<A, MaybePromise<B> | B>, f2: Func<B, MaybePromise<C> | C>, f3: Func<C, MaybePromise<D> | D>, f4: Func<D, MaybePromise<E> | E>, f5: Func<E, MaybePromise<F> | F>, f6: Func<F, MaybePromise<G> | G>, f7: Func<G, MaybePromise<H> | H>): MaybePromise<H>
export function pipeAsync<A extends any[], B, C, D, E, F, G, H, I>(f1: (...args: A) => MaybePromise<B> | B, f2: Func<B, MaybePromise<C> | C>, f3: Func<C, MaybePromise<D> | D>, f4: Func<D, MaybePromise<E> | E>, f5: Func<E, MaybePromise<F> | F>, f6: Func<F, MaybePromise<G> | G>, f7: Func<G, MaybePromise<H> | H>, f8: Func<H, MaybePromise<I> | I>): (...args: A) => MaybePromise<I>
export function pipeAsync<A, B, C, D, E, F, G, H, I>(value: A, f1: Func<A, MaybePromise<B> | B>, f2: Func<B, MaybePromise<C> | C>, f3: Func<C, MaybePromise<D> | D>, f4: Func<D, MaybePromise<E> | E>, f5: Func<E, MaybePromise<F> | F>, f6: Func<F, MaybePromise<G> | G>, f7: Func<G, MaybePromise<H> | H>, f8: Func<H, MaybePromise<I> | I>): MaybePromise<I>
export function pipeAsync<A extends any[], B, C, D, E, F, G, H, I, J>(f1: (...args: A) => MaybePromise<B> | B, f2: Func<B, MaybePromise<C> | C>, f3: Func<C, MaybePromise<D> | D>, f4: Func<D, MaybePromise<E> | E>, f5: Func<E, MaybePromise<F> | F>, f6: Func<F, MaybePromise<G> | G>, f7: Func<G, MaybePromise<H> | H>, f8: Func<H, MaybePromise<I> | I>, f9: Func<I, MaybePromise<J> | J>): (...args: A) => MaybePromise<J>
export function pipeAsync<A, B, C, D, E, F, G, H, I, J>(value: A, f1: Func<A, MaybePromise<B> | B>, f2: Func<B, MaybePromise<C> | C>, f3: Func<C, MaybePromise<D> | D>, f4: Func<D, MaybePromise<E> | E>, f5: Func<E, MaybePromise<F> | F>, f6: Func<F, MaybePromise<G> | G>, f7: Func<G, MaybePromise<H> | H>, f8: Func<H, MaybePromise<I> | I>, f9: Func<I, MaybePromise<J> | J>): MaybePromise<J>

export function pipeAsync(valueOrFn: MaybeAsyncFunc<any, any> | any, ...fns: MaybeAsyncFunc<any, any>[]): any {
  const handlePromise = (acc: MaybePromise<any>, fn: MaybeAsyncFunc<any, any>) => {
    return isPromise(acc) ? acc.then(fn) : fn(acc)
  }

  if (isFunction(valueOrFn)) {
    return async (...args: any[]) => {
      return fns.reduce((acc, fn) => handlePromise(acc, fn), await (valueOrFn as Function)(...args))
    }
  }
  return fns.reduce((acc, fn) => handlePromise(acc, fn), Promise.resolve(valueOrFn))
}
