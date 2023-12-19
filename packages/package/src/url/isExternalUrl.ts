import { isBrowser } from '..'
import { isValidUrl } from '.'

export const isExternalUrl = (url: string | URL) => {
  if (!isBrowser) { return false }
  if (!isValidUrl(url)) { return false }

  // @ts-expect-error
  return new URL(url).host === window.location.host
}
