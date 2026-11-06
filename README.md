# jsencrypt-ext

[English](./README.md) | [中文](./README_zh.md)

**jsencrypt-ext** is a robust extension of the popular [jsencrypt](https://www.npmjs.com/package/jsencrypt) library. While RSA is technically not designed for long messages, many real-world business scenarios require it. This library provides a high-performance, cross-platform solution for **RSA chunked encryption and decryption**.

---

## ✨ Features

- **📦 Automatic Chunking**: Seamlessly encrypts and decrypts strings of any length by automatically calculating the maximum block size based on your RSA key bit length.
- **🛡️ UTF-8 Integrity**: Optimized for multi-byte characters. It ensures that characters like Chinese, Japanese, or Emojis are never "sliced" in half at chunk boundaries.
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
encryptor.setPublicKey(`-----BEGIN PUBLIC KEY----- ... -----END PUBLIC KEY-----`)
const ciphertext = encryptor.encrypt(longMessage)

// 2. Decryption
const decryptor = new JSEncryptExt()
decryptor.setPrivateKey(`-----BEGIN PRIVATE KEY----- ... -----END PRIVATE KEY-----`)
const plaintext = decryptor.decrypt(ciphertext)
```

## Security Note

This package preserves `jsencrypt`'s RSA PKCS#1 v1.5 behavior for compatibility. Chunked RSA ciphertext is not authenticated as a whole. For new protocols, prefer hybrid encryption with RSA-OAEP for key wrapping and an authenticated cipher such as AES-GCM for the message.

## Development

The repository uses Node.js 22.18+, 24.11+, or 26+ and pins pnpm through `packageManager`.

```bash
pnpm install
pnpm check
```

`pnpm check` runs formatting, TypeScript, ESLint, ESM/CommonJS builds, package/type validation, and the complete test suite.
