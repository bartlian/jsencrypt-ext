# jsencrypt-ext

[English](./README.md) | [中文](./README_zh.md)

[![npm version](https://img.shields.io/npm/v/jsencrypt-ext.svg)](https://www.npmjs.com/package/jsencrypt-ext)
[![npm downloads](https://img.shields.io/npm/dm/jsencrypt-ext.svg)](https://www.npmjs.com/package/jsencrypt-ext)
[![CI](https://github.com/bartlian/jsencrypt-ext/actions/workflows/ci.yml/badge.svg)](https://github.com/bartlian/jsencrypt-ext/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/jsencrypt-ext.svg)](./LICENSE)

**RSA long-message chunked encryption and decryption for JavaScript and TypeScript.**

**jsencrypt-ext** extends the popular [JSEncrypt](https://www.npmjs.com/package/jsencrypt) API with automatic RSA chunking for long text. It safely handles UTF-8, Chinese, Japanese, and Emoji at RSA block boundaries and works in browsers, Node.js, and mini-programs.

---

## ✨ Features

- **📦 Automatic Chunking**: Seamlessly encrypts and decrypts strings of any length by automatically calculating the maximum block size based on your RSA key bit length.
- **🛡️ UTF-8 Integrity**: Optimized for multi-byte characters. It ensures that characters like Chinese, Japanese, or Emojis are never "sliced" in half at chunk boundaries.
- **🚀 Cross-Platform**: Fully compatible with **Browsers**, **Node.js**, and **Mini-programs**.
- **💪 TypeScript First**: Built with TypeScript for excellent IDE autocompletion and type safety.
- **🔌 Familiar JSEncrypt API**: Keep the usual public/private key workflow while adding long-message support.
- **📚 ES2015, ESM, and CommonJS**: Ships ES2015-compatible ESM and CommonJS entry points with TypeScript declarations.

## Common Use Cases

- RSA encryption and decryption of long JSON payloads or form data.
- JSEncrypt long-text encryption containing Chinese, Japanese, or Emoji.
- Browser, Node.js, and mini-program integrations that use RSA PKCS#1 v1.5.
- Decrypting segmented ciphertext produced by earlier `jsencrypt-ext` releases.

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
