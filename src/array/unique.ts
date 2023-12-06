type ByOptions<T, K extends string | number | symbol> = {
  by: (item: T) => K
  cmp?: never
}

type CmpOptions<T> = {
  by?: never
  cmp: (a: T, b: T) => boolean
}

type UniqueOptions<T, K extends string | number | symbol> = ByOptions<T, K> | CmpOptions<T>

export const unique = <T, K extends string | number | symbol>(
  arr: Array<T>,
  options?: UniqueOptions<T, K>
) => {
  const { by, cmp } = options || {}

  if (!by && !cmp) {
    return [...new Set(arr)]
  }

  if (by) {
    const seen = new Set<K>()
    return arr.filter((item) => {
      const key = by(item)
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }

  if (cmp) {
    const uniqueArray: T[] = []
    arr.forEach((value) => {
      if (!uniqueArray.some((uniqueValue) => cmp(value, uniqueValue))) {
        uniqueArray.push(value)
      }
    })
    return uniqueArray
  }
}
