import assert from 'node:assert/strict'
import { generateKeyPairSync } from 'node:crypto'
import { createRequire } from 'node:module'
import test from 'node:test'

import JSEncryptExt, { JSEncryptExt as NamedJSEncryptExt } from 'jsencrypt-ext'
import {
  legacyLongCiphertext,
  legacyLongPlaintext,
  legacyPrivateKey
} from './fixtures/legacy-long-ciphertext.mjs'

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 1024,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
})

function createEncryptor() {
  const encryptor = new JSEncryptExt()
  encryptor.setPublicKey(publicKey)
  return encryptor
}

function createDecryptor() {
  const decryptor = new JSEncryptExt()
  decryptor.setPrivateKey(privateKey)
  return decryptor
}

function roundTrip(message) {
  const ciphertext = createEncryptor().encrypt(message)
  assert.notEqual(ciphertext, false)
  assert.equal(createDecryptor().decrypt(ciphertext), message)
}

test('exports the same class as default and named ESM exports', () => {
  assert.equal(JSEncryptExt, NamedJSEncryptExt)
})

test('exposes default and named CommonJS exports', () => {
  const require = createRequire(import.meta.url)
  const commonJsModule = require('jsencrypt-ext')

  assert.equal(commonJsModule.default, commonJsModule.JSEncryptExt)
})

test('round-trips an empty message', () => {
  roundTrip('')
})

test('round-trips short and segmented ASCII messages', () => {
  roundTrip('hello, jsencrypt-ext')
  roundTrip('abc123-'.repeat(100))
})

test('round-trips segmented CJK messages', () => {
  roundTrip('天地玄黄宇宙洪荒'.repeat(100))
})

test('round-trips segmented emoji without splitting surrogate pairs', () => {
  roundTrip('中文、かな、emoji 🚀🔐 — segmented RSA. '.repeat(100))
})

test('encrypts and decrypts a long structured plaintext across many RSA blocks', () => {
  const longPlaintext = JSON.stringify(
    Array.from({ length: 500 }, (_, index) => ({
      id: index,
      value: `第 ${index} 项：中文、かな、emoji 🚀🔐`
    }))
  )
  const ciphertext = createEncryptor().encrypt(longPlaintext)

  assert.notEqual(ciphertext, false)
  const ciphertextBytes = Buffer.from(ciphertext, 'base64')
  assert.ok(Buffer.byteLength(longPlaintext) > 20_000)
  assert.ok(ciphertextBytes.length > 128 * 100)
  assert.equal(ciphertextBytes.length % 128, 0)
  assert.equal(createDecryptor().decrypt(ciphertext), longPlaintext)
})

test('decrypts a fixed long ciphertext produced by the legacy implementation', () => {
  const decryptor = new JSEncryptExt()
  decryptor.setPrivateKey(legacyPrivateKey)

  assert.equal(Buffer.byteLength(legacyLongPlaintext), 490)
  assert.equal(Buffer.from(legacyLongCiphertext, 'base64').length, 512)
  assert.equal(decryptor.decrypt(legacyLongCiphertext), legacyLongPlaintext)
})

test('round-trips text at chunk boundaries', () => {
  roundTrip('a'.repeat(117))
  roundTrip('a'.repeat(118))
  roundTrip(`${'a'.repeat(111)}🚀`)
  roundTrip(`${'a'.repeat(112)}🚀`)
})

test('decrypts legacy single-block ciphertext without leading zero bytes', () => {
  const message = 'legacy leading zero compatibility'
  const encryptor = createEncryptor()
  const decryptor = createDecryptor()
  let ciphertext
  let bytes

  for (let attempt = 0; attempt < 4096; attempt++) {
    ciphertext = encryptor.encrypt(message)
    assert.notEqual(ciphertext, false)
    bytes = Buffer.from(ciphertext, 'base64')
    if (bytes[0] === 0) break
  }

  assert.equal(bytes[0], 0, 'failed to produce a ciphertext with a leading zero byte')

  const legacyCiphertext = bytes.subarray(1).toString('base64')
  assert.equal(decryptor.decrypt(legacyCiphertext), message)
})

test('accepts whitespace in wrapped legacy Base64 ciphertext', () => {
  const message = 'wrapped legacy ciphertext'
  const ciphertext = createEncryptor().encrypt(message)
  assert.notEqual(ciphertext, false)

  const wrappedCiphertext = ciphertext.match(/.{1,32}/g).join('\n')
  assert.equal(createDecryptor().decrypt(`\n${wrappedCiphertext}\n`), message)
})

test('rejects malformed, non-canonical, or truncated ciphertext', () => {
  const decryptor = createDecryptor()
  const ciphertext = createEncryptor().encrypt('segmented message '.repeat(20))
  assert.notEqual(ciphertext, false)

  assert.equal(decryptor.decrypt('not valid ciphertext'), false)
  assert.equal(decryptor.decrypt(`${ciphertext.slice(0, 12)}!${ciphertext.slice(12)}`), false)
  assert.equal(decryptor.decrypt(`${ciphertext}ignored-content`), false)
  assert.equal(decryptor.decrypt(ciphertext.slice(0, -4)), false)
})
