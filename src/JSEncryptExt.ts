import JSEncrypt from 'jsencrypt'
import { b64tohex, hex2b64, normalizeBase64 } from './utils/base64'
import { splitTextForJSEncrypt } from './utils/tool'

export type IJSEncryptOptions = NonNullable<ConstructorParameters<typeof JSEncrypt>[0]>

interface RsaKeyInternals {
  n: {
    bitLength(): number
  }
}

export default class JSEncryptExt extends JSEncrypt {
  constructor(options?: IJSEncryptOptions) {
    super(options)
  }

  override encrypt(str: string): string | false {
    try {
      const key = this.getKey()
      const modulusBitLength = (key as unknown as RsaKeyInternals).n.bitLength()
      const maxByteLength = Math.ceil(modulusBitLength / 8) - 11
      const blockHexLength = Math.ceil(modulusBitLength / 8) * 2
      const chunks = splitTextForJSEncrypt(str, maxByteLength)

      let cipherHexSum = ''
      for (const chunk of chunks) {
        let encrypted = key.encrypt(chunk)

        if (!encrypted) return false

        while (encrypted.length < blockHexLength) {
          encrypted = '0' + encrypted
        }

        cipherHexSum += encrypted
      }
      return hex2b64(cipherHexSum)
    } catch {
      return false
    }
  }

  override decrypt(cipherText: string): string | false {
    try {
      const normalizedCipherText = normalizeBase64(cipherText)
      if (normalizedCipherText === false) return false

      const hexText = b64tohex(normalizedCipherText)
      const key = this.getKey()
      const modulusBitLength = (key as unknown as RsaKeyInternals).n.bitLength()
      const blockHexLength = Math.ceil(modulusBitLength / 8) * 2
      const normalizedHexText =
        hexText.length < blockHexLength ? hexText.padStart(blockHexLength, '0') : hexText

      if (normalizedHexText.length % blockHexLength !== 0) return false

      let plainText = ''
      for (let i = 0; i < normalizedHexText.length; i += blockHexLength) {
        const hexChunk = normalizedHexText.substring(i, i + blockHexLength)
        const decrypted = key.decrypt(hexChunk)

        if (typeof decrypted !== 'string') return false

        plainText += decrypted
      }

      return plainText
    } catch {
      return false
    }
  }
}
