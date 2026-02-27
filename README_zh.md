# jsencrypt-ext

[English](./README.md) | [中文](./README_zh.md)

**jsencrypt-ext** 是对广受欢迎的 [jsencrypt](https://www.npmjs.com/package/jsencrypt) 库的强大扩展。虽然从技术上讲 RSA 并不是为长消息设计的，但许多现实世界中的业务场景都有此需求。该库为 **RSA 分段加密和解密**提供了一个高性能、跨平台的解决方案。

---

## ✨ 特性

- **📦 自动分段**：通过根据您的 RSA 密钥位数自动计算最大块大小，无缝加密和解密任意长度的字符串。
- **🛡️ UTF-8 完整性**：针对多字节字符进行了优化。它确保在分段边界处，中文、日文或 Emoji 等字符永远不会被“截断”。
- **🚀 跨平台**：完全兼容**浏览器**、**Node.js** 和**小程序**。
- **💪 TypeScript 优先**：使用 TypeScript 构建，提供出色的 IDE 自动补全和类型安全支持。

---

## 📦 安装

```bash
# 使用 pnpm
pnpm add jsencrypt-ext

# 使用 npm
npm install jsencrypt-ext
```

## 🚀 快速开始

```typescript
import JSEncryptExt from 'jsencrypt-ext'
// 或
// import { JSEncryptExt } from 'jsencrypt-ext'

const longMessage =
  '这是一段非常长的字符串，通常会超过 RSA 加密的位数限制。' +
  'jsencrypt-ext 会自动处理分段和拼接！ 🚀'

// 1. 加密
const encryptor = new JSEncryptExt()
encryptor.setPublicKey(`-----BEGIN PUBLIC KEY----- ... -----END PUBLIC KEY-----`)
const ciphertext = encryptor.encrypt(longMessage)

// 2. 解密
const decryptor = new JSEncryptExt()
decryptor.setPrivateKey(`-----BEGIN PRIVATE KEY----- ... -----END PRIVATE KEY-----`)
const plaintext = decryptor.decrypt(ciphertext)
```
