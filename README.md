## Introduction

[jsencrypt](https://www.npmjs.com/package/jsencrypt) is a popular RSA Javascript encryption library, but it does not support to encryt/decrypt long message. Although RSA is not recommended to encrypt long plaintext, there are still many business scenes to achieve it. I have extended the lib, based on jsencrypt.

## How to use

```js
import JSEncrypt from "jsencrypt-ext";

const encryptInstance = new JSEncrypt();
encryptInstance.setPublicKey("publicKey");

const ciphertext = encryptInstance.encrypt("long plaintext");

const decryptInstance = new JSEncrypt();
decryptInstance.setPrivateKey("privateKey");

const plaintext = decryptInstance.decrypt("ciphertext");
```
