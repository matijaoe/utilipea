export const isValidUrl = (url: string | URL): url is URL => {
  try {
    // eslint-disable-next-line no-new
    new URL(url)
    return true
  } catch {
    return false
  }
}
