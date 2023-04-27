import JSEncrypt from 'jsencrypt'
import type { IJSEncryptOptions } from 'jsencrypt/lib/JSEncrypt'
import { b64tohex, hex2b64 } from './utils/base64'

export default class JSEncryptExt extends JSEncrypt {
  constructor(options?: IJSEncryptOptions) {
    super(options)
  }

  encrypt(str: string) {
    try {
      // @ts-ignore
      const maxByteLength = ((this.getKey().n.bitLength() + 7) >> 3) - 11
      let i = 0
      const byteArr = []
      while (i <= str.length - 1) {
        const c = str.charCodeAt(i)
        if (c < 128) {
          byteArr.push(str[i])
        } else if (c > 127 && c < 2048) {
          byteArr.push(null, str[i])
        } else {
          byteArr.push(null, null, str[i])
        }
        i++
      }

      if (byteArr.length <= maxByteLength) {
        return hex2b64(this.getKey().encrypt(str))
      } else {
        // long plain text encrypt
        let cipherStrSum = ''
        while (byteArr.length > 0) {
          let offset = maxByteLength
          while (byteArr[offset - 1] === null) {
            offset = offset - 1
          }
          const text = byteArr
            .slice(0, offset)
            .filter(i => i !== null)
            .join('')
          cipherStrSum += this.getKey().encrypt(text)
          byteArr.splice(0, offset)
        }
        return hex2b64(cipherStrSum)
      }
    } catch (error) {
      return false
    }
  }

  decrypt(cipherText: string) {
    try {
      const hexText = b64tohex(cipherText)
      // @ts-ignore
      const maxLength = this.getKey().n.bitLength() / 4

      if (hexText.length <= maxLength) {
        return this.getKey().decrypt(hexText)
      } else {
        // long cipher text decrypt
        const arr = hexText.match(new RegExp('.{1,' + maxLength + '}', 'g'))!
        const plainText = arr.reduce((acc, cur) => {
          return acc + this.getKey().decrypt(cur)
        }, '')

        return plainText
      }
    } catch (error) {
      return false
    }
  }
}
