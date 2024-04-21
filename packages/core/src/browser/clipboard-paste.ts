// TODO: advanced implementation, pasting images
export const clipboardPaste = async () => {
  return window.navigator.clipboard.read()
}
