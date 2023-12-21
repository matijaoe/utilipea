import type { Integer } from 'type-fest'

export const isSafeInteger = Number.isSafeInteger as <T extends number>(value: T) => value is Integer<T>
