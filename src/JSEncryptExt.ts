import JSEncrypt from 'jsencrypt'
import type { IJSEncryptOptions } from 'jsencrypt/lib/JSEncrypt'
import { b64tohex, hex2b64 } from './utils/base64'
import { stringToUint8, uint8ToString } from './utils/tool'

export default class JSEncryptExt extends JSEncrypt {
  constructor(options?: IJSEncryptOptions) {
    super(options)
  }

  encrypt(str: string) {
    try {
      const key = this.getKey()
      // @ts-ignore
      const maxByteLength = ((key.n.bitLength() + 7) >> 3) - 11

      // @ts-ignore
      const blockHexLength = Math.ceil(key.n.bitLength() / 8) * 2

      const fullBytes = stringToUint8(str)

      if (fullBytes.length <= maxByteLength) {
        let encrypted = key.encrypt(str)
        if (!encrypted) return false

        while (encrypted.length < blockHexLength) {
          encrypted = '0' + encrypted
        }
        return hex2b64(encrypted)
      }

      let cipherHexSum = ''
      for (let offset = 0; offset < fullBytes.length; ) {
        let end = offset + maxByteLength
        if (end > fullBytes.length) end = fullBytes.length

        while (end > offset && end < fullBytes.length && (fullBytes[end] & 0xc0) === 0x80) {
          end--
        }

        const chunk = fullBytes.slice(offset, end)
        const textChunk = uint8ToString(chunk)
        let encrypted = key.encrypt(textChunk)

        if (!encrypted) return false

        while (encrypted.length < blockHexLength) {
          encrypted = '0' + encrypted
        }

        cipherHexSum += encrypted
        offset = end
      }
      return hex2b64(cipherHexSum)
    } catch (error) {
      return false
    }
  }

  decrypt(cipherText: string) {
    try {
      const hexText = b64tohex(cipherText)
      const key = this.getKey()
      // @ts-ignore
      const maxLength = Math.ceil(key.n.bitLength() / 8) * 2

      if (hexText.length <= maxLength) {
        return key.decrypt(hexText)
      }

      let plainText = ''
      for (let i = 0; i < hexText.length; i += maxLength) {
        const hexChunk = hexText.substring(i, i + maxLength)
        const decrypted = key.decrypt(hexChunk)

        if (!decrypted) return false

        plainText += decrypted
      }

      return plainText
    } catch (error) {
      return false
    }
  }
}
