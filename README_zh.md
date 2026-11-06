# jsencrypt-ext

[English](./README.md) | [中文](./README_zh.md)

[![npm version](https://img.shields.io/npm/v/jsencrypt-ext.svg)](https://www.npmjs.com/package/jsencrypt-ext)
[![npm downloads](https://img.shields.io/npm/dm/jsencrypt-ext.svg)](https://www.npmjs.com/package/jsencrypt-ext)
[![CI](https://github.com/bartlian/jsencrypt-ext/actions/workflows/ci.yml/badge.svg)](https://github.com/bartlian/jsencrypt-ext/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/jsencrypt-ext.svg)](./LICENSE)

**面向 JavaScript 和 TypeScript 的 RSA 长文本分段加密与分段解密。**

**jsencrypt-ext** 扩展了广受欢迎的 [JSEncrypt](https://www.npmjs.com/package/jsencrypt) API，为长文本提供自动 RSA 分段能力。它能够在 RSA 分段边界安全处理 UTF-8、中文、日文和 Emoji，并兼容浏览器、Node.js 与小程序。

---

## ✨ 特性

- **📦 自动分段**：通过根据您的 RSA 密钥位数自动计算最大块大小，无缝加密和解密任意长度的字符串。
- **🛡️ UTF-8 完整性**：针对多字节字符进行了优化。它确保在分段边界处，中文、日文或 Emoji 等字符永远不会被“截断”。
- **🚀 跨平台**：完全兼容**浏览器**、**Node.js** 和**小程序**。
- **💪 TypeScript 优先**：使用 TypeScript 构建，提供出色的 IDE 自动补全和类型安全支持。
- **🔌 保持 JSEncrypt API**：沿用熟悉的公钥加密、私钥解密流程，同时支持长明文和长密文。
- **📚 ES2015、ESM 与 CommonJS**：同时提供兼容 ES2015、带类型声明的 ESM 和 CommonJS 入口。

## 适用场景

- 对长 JSON、表单数据等内容进行 RSA 分段加密和解密。
- 使用 JSEncrypt 加密包含中文、日文或 Emoji 的长文本。
- 在浏览器、Node.js 和小程序中对接 RSA PKCS#1 v1.5 协议。
- 解密旧版 `jsencrypt-ext` 生成的分段密文。

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

## 安全说明

为了兼容现有协议，本包保留了 `jsencrypt` 的 RSA PKCS#1 v1.5 行为。分段 RSA 密文不提供整体认证和防篡改能力。设计新协议时，建议使用 RSA-OAEP 封装随机密钥，并使用 AES-GCM 等带认证的对称加密算法处理正文。

## 本地开发

项目支持 Node.js 22.18+、24.11+ 或 26+，并通过 `packageManager` 固定 pnpm 版本。

```bash
pnpm install
pnpm check
```

`pnpm check` 会依次执行格式检查、TypeScript 检查、ESLint、ESM/CommonJS 构建、发布包与类型校验，以及完整测试。
