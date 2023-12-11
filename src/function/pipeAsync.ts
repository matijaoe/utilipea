import { isPromise } from '..'
import type { Func } from '.'

type MaybePromise<T> = T | Promise<T>
type AsyncFunc<T, R> = (...args: T[]) => Promise<R>

export function pipeAsync<A extends any[], B>(f1: (...args: A) => Promise<B> | B): (...args: A) => Promise<B>
export function pipeAsync<A, B>(value: A, f1: Func<A, Promise<B> | B>): Promise<B>
export function pipeAsync<A extends any[], B, C>(f1: (...args: A) => Promise<B> | B, f2: Func<B, Promise<C> | C>): (...args: A) => Promise<C>
export function pipeAsync<A, B, C>(value: A, f1: Func<A, Promise<B> | B>, f2: Func<B, Promise<C> | C>): Promise<C>
export function pipeAsync<A extends any[], B, C, D>(f1: (...args: A) => Promise<B> | B, f2: Func<B, Promise<C> | C>, f3: Func<C, Promise<D> | D>): (...args: A) => Promise<D>
export function pipeAsync<A, B, C, D>(value: A, f1: Func<A, Promise<B> | B>, f2: Func<B, Promise<C> | C>, f3: Func<C, Promise<D> | D>): Promise<D>
export function pipeAsync<A extends any[], B, C, D, E>(f1: (...args: A) => Promise<B> | B, f2: Func<B, Promise<C> | C>, f3: Func<C, Promise<D> | D>, f4: Func<D, Promise<E> | E>): (...args: A) => Promise<E>
export function pipeAsync<A, B, C, D, E>(value: A, f1: Func<A, Promise<B> | B>, f2: Func<B, Promise<C> | C>, f3: Func<C, Promise<D> | D>, f4: Func<D, Promise<E> | E>): Promise<E>
export function pipeAsync<A extends any[], B, C, D, E, F>(f1: (...args: A) => Promise<B> | B, f2: Func<B, Promise<C> | C>, f3: Func<C, Promise<D> | D>, f4: Func<D, Promise<E> | E>, f5: Func<E, Promise<F> | F>): (...args: A) => Promise<F>
export function pipeAsync<A, B, C, D, E, F>(value: A, f1: Func<A, Promise<B> | B>, f2: Func<B, Promise<C> | C>, f3: Func<C, Promise<D> | D>, f4: Func<D, Promise<E> | E>, f5: Func<E, Promise<F> | F>): Promise<F>
export function pipeAsync<A extends any[], B, C, D, E, F, G>(f1: (...args: A) => Promise<B> | B, f2: Func<B, Promise<C> | C>, f3: Func<C, Promise<D> | D>, f4: Func<D, Promise<E> | E>, f5: Func<E, Promise<F> | F>, f6: Func<F, Promise<G> | G>): (...args: A) => Promise<G>
export function pipeAsync<A, B, C, D, E, F, G>(value: A, f1: Func<A, Promise<B> | B>, f2: Func<B, Promise<C> | C>, f3: Func<C, Promise<D> | D>, f4: Func<D, Promise<E> | E>, f5: Func<E, Promise<F> | F>, f6: Func<F, Promise<G> | G>): Promise<G>
export function pipeAsync<A extends any[], B, C, D, E, F, G, H>(f1: (...args: A) => Promise<B> | B, f2: Func<B, Promise<C> | C>, f3: Func<C, Promise<D> | D>, f4: Func<D, Promise<E> | E>, f5: Func<E, Promise<F> | F>, f6: Func<F, Promise<G> | G>, f7: Func<G, Promise<H> | H>): (...args: A) => Promise<H>
export function pipeAsync<A, B, C, D, E, F, G, H>(value: A, f1: Func<A, Promise<B> | B>, f2: Func<B, Promise<C> | C>, f3: Func<C, Promise<D> | D>, f4: Func<D, Promise<E> | E>, f5: Func<E, Promise<F> | F>, f6: Func<F, Promise<G> | G>, f7: Func<G, Promise<H> | H>): Promise<H>
export function pipeAsync<A extends any[], B, C, D, E, F, G, H, I>(f1: (...args: A) => Promise<B> | B, f2: Func<B, Promise<C> | C>, f3: Func<C, Promise<D> | D>, f4: Func<D, Promise<E> | E>, f5: Func<E, Promise<F> | F>, f6: Func<F, Promise<G> | G>, f7: Func<G, Promise<H> | H>, f8: Func<H, Promise<I> | I>): (...args: A) => Promise<I>
export function pipeAsync<A, B, C, D, E, F, G, H, I>(value: A, f1: Func<A, Promise<B> | B>, f2: Func<B, Promise<C> | C>, f3: Func<C, Promise<D> | D>, f4: Func<D, Promise<E> | E>, f5: Func<E, Promise<F> | F>, f6: Func<F, Promise<G> | G>, f7: Func<G, Promise<H> | H>, f8: Func<H, Promise<I> | I>): Promise<I>
export function pipeAsync<A extends any[], B, C, D, E, F, G, H, I, J>(f1: (...args: A) => Promise<B> | B, f2: Func<B, Promise<C> | C>, f3: Func<C, Promise<D> | D>, f4: Func<D, Promise<E> | E>, f5: Func<E, Promise<F> | F>, f6: Func<F, Promise<G> | G>, f7: Func<G, Promise<H> | H>, f8: Func<H, Promise<I> | I>, f9: Func<I, Promise<J> | J>): (...args: A) => Promise<J>
export function pipeAsync<A, B, C, D, E, F, G, H, I, J>(value: A, f1: Func<A, Promise<B> | B>, f2: Func<B, Promise<C> | C>, f3: Func<C, Promise<D> | D>, f4: Func<D, Promise<E> | E>, f5: Func<E, Promise<F> | F>, f6: Func<F, Promise<G> | G>, f7: Func<G, Promise<H> | H>, f8: Func<H, Promise<I> | I>, f9: Func<I, Promise<J> | J>): Promise<J>

export function pipeAsync(valueOrFn: AsyncFunc<any, any> | any, ...fns: AsyncFunc<any, any>[]): any {
  const handlePromise = (acc: MaybePromise<any>, fn: AsyncFunc<any, any>) => {
    return isPromise(acc) ? acc.then(fn) : fn(acc)
  }

  if (typeof valueOrFn === 'function') {
    return async (...args: any[]) => {
      return fns.reduce((acc, fn) => handlePromise(acc, fn), await (valueOrFn as Function)(...args))
    }
  }
  return fns.reduce((acc, fn) => handlePromise(acc, fn), valueOrFn)
}

// create pipe example
const add = (a: number, b: number) => a + b
const double = (a: number) => a * 2
const increment = (a: number) => a + 1
const square = (a: number) => a * a

const pipeExample = pipeAsync(add, double, increment, square)
const result = await pipeExample(1, 2)
console.log(result)
