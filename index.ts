const tuple = [1, 2, 3, 5] as unknown as readonly[number, number, number]
const element = tuple.at(1)
type T = typeof element // 2
const element2 = tuple.at(-1)
type U = typeof element2; 
const element3 = tuple.at(100) 
type V = typeof element3 // undefined
