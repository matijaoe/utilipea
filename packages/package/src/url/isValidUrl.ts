export const isValidUrl = (url: string | URL) => {
  try {
    // eslint-disable-next-line no-new
    new URL(url)
    return url
  } catch (error) {
    return false
  }
}
