export function stringToUint8(str: string): Uint8Array {
  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder().encode(str)
  }

  const b: number[] = []
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i)
    if (c < 0x80) {
      b.push(c)
    } else if (c < 0x800) {
      b.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f))
    } else if (c < 0xd800 || c >= 0xe000) {
      b.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f))
    } else {
      i++
      c = 0x10000 + (((c & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff))
      b.push(
        0xf0 | (c >> 18),
        0x80 | ((c >> 12) & 0x3f),
        0x80 | ((c >> 6) & 0x3f),
        0x80 | (c & 0x3f)
      )
    }
  }
  return new Uint8Array(b)
}

export function uint8ToString(bytes: Uint8Array): string {
  if (typeof TextDecoder !== 'undefined') {
    return new TextDecoder().decode(bytes)
  }

  let out = '',
    i = 0
  const len = bytes.length
  while (i < len) {
    const c = bytes[i++]
    if (c < 0x80) {
      out += String.fromCharCode(c)
    } else if (c < 0xe0) {
      out += String.fromCharCode(((c & 0x1f) << 6) | (bytes[i++] & 0x3f))
    } else if (c < 0xf0) {
      out += String.fromCharCode(
        ((c & 0x0f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f)
      )
    } else {
      const code =
        (((c & 0x07) << 18) |
          ((bytes[i++] & 0x3f) << 12) |
          ((bytes[i++] & 0x3f) << 6) |
          (bytes[i++] & 0x3f)) -
        0x10000
      out += String.fromCharCode(0xd800 + (code >> 10), 0xdc00 + (code & 0x3ff))
    }
  }
  return out
}
