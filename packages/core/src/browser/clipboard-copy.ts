/* eslint-disable */
import { isString } from '..'

export const clipboardCopy = async (val: string | ClipboardItem[]): Promise<void> => {
  if (isString(val)) {
    return window.navigator.clipboard.writeText(val)
  }
  return window.navigator.clipboard.write(val)
}
