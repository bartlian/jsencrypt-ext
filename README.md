# jsencrypt-ext

**jsencrypt-ext** is a robust extension of the popular [jsencrypt](https://www.npmjs.com/package/jsencrypt) library. While RSA is technically not designed for long messages, many real-world business scenarios require it. This library provides a high-performance, cross-platform solution for **RSA chunked encryption and decryption**.

---

## ✨ Features

- **📦 Automatic Chunking**: Seamlessly encrypts and decrypts strings of any length by automatically calculating the maximum block size based on your RSA key bit length.
- **🛡️ UTF-8 Integrity**: Optimized for multi-byte characters. It ensures that characters like Chinese, Japanese, or Emojis are never "sliced" in half at chunk boundaries.
- **🧩 Zero-Padding Fix**: Solves the common "missing leading zero" bug in RSA hex-to-base64 conversions, ensuring decryption never fails due to bit-alignment issues.
- **🚀 Cross-Platform**: Fully compatible with **Browsers**, **Node.js**, and **Mini-programs**.
- **💪 TypeScript First**: Built with TypeScript for excellent IDE autocompletion and type safety.

---

## 📦 Installation

```bash
# Using pnpm
pnpm add jsencrypt-ext

# Using npm
npm install jsencrypt-ext

```

---

## 🚀 Quick Start

```typescript
import JSEncryptExt from 'jsencrypt-ext'
// or
// import { JSEncryptExt } from 'jsencrypt-ext'

const longMessage =
  'This is a very long string that would normally exceed the RSA bit limit. ' +
  'jsencrypt-ext handles the chunking and concatenation automatically! 🚀'

// 1. Encryption
const encryptor = new JSEncryptExt()
encryptor.setPublicKey(
  `-----BEGIN PUBLIC KEY----- ... -----END PUBLIC KEY-----`
)
const ciphertext = encryptor.encrypt(longMessage)

// 2. Decryption
const decryptor = new JSEncryptExt()
decryptor.setPrivateKey(
  `-----BEGIN PRIVATE KEY----- ... -----END PRIVATE KEY-----`
)
const plaintext = decryptor.decrypt(ciphertext)
```
