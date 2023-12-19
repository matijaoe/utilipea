export const isValidUrl = (url: string | URL) => {
  try {
    return new URL(url)
  } catch (error) {
    return false
  }
}
