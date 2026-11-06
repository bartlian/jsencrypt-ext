function codeUnitByteLength(codeUnit: number): number {
  if (codeUnit < 0x80) return 1
  if (codeUnit < 0x800) return 2
  return 3
}

function characterLengthAt(str: string, index: number): number {
  const codeUnit = str.charCodeAt(index)
  const nextCodeUnit = str.charCodeAt(index + 1)

  const isSurrogatePair =
    codeUnit >= 0xd800 && codeUnit <= 0xdbff && nextCodeUnit >= 0xdc00 && nextCodeUnit <= 0xdfff

  return isSurrogatePair ? 2 : 1
}

/**
 * Splits text according to the UTF-16 based UTF-8 encoding used internally by
 * jsencrypt's PKCS#1 v1.5 padding implementation.
 */
export function splitTextForJSEncrypt(str: string, maxByteLength: number): string[] {
  if (!Number.isInteger(maxByteLength) || maxByteLength <= 0) {
    throw new RangeError('maxByteLength must be a positive integer')
  }

  if (str.length === 0) return ['']

  const chunks: string[] = []
  let chunkStart = 0
  let chunkByteLength = 0

  for (let index = 0; index < str.length;) {
    const characterLength = characterLengthAt(str, index)
    let characterByteLength = 0

    for (let offset = 0; offset < characterLength; offset++) {
      characterByteLength += codeUnitByteLength(str.charCodeAt(index + offset))
    }

    if (characterByteLength > maxByteLength) {
      throw new RangeError('RSA key is too small for the input character')
    }

    if (chunkByteLength + characterByteLength > maxByteLength) {
      chunks.push(str.slice(chunkStart, index))
      chunkStart = index
      chunkByteLength = 0
    }

    chunkByteLength += characterByteLength
    index += characterLength
  }

  chunks.push(str.slice(chunkStart))
  return chunks
}
