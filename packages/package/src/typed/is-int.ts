import type { Integer } from 'type-fest'

export const isInteger = Number.isInteger as <T extends number>(value: T) => value is Integer<T>
