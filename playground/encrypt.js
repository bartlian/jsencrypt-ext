const JSEncrypt = require('../lib/index').default

const key = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA022YLzAYomTLJexdG7hR
n80LFVNFS4F7QL65B1Zxbb3VgCCuNDerjaNGqCATitwnToPts7Q+lrmSyvdeDxH5
wxjPC2I4DKU8YwWNR+hxLWV19FkZIxyICbutv7ekC9kdRXjUU6k6GXAUYQK1eipf
NYNFQznrjWoGpDwGCQUuMzoPKKXoyO4AKOmmniT5eWTdaC40heMg+p4xL0efDVjk
uD1AG/KO8bAU171ev5FjdhSGhT2ge4MBiFHibdiCuLTXGpRZvIYER2NZiZc01req
cd/tOfg0OjmiJIG5UNmBwDkDjfjgOn3rPD21eCL29rORe/9K9jKoszKEjI4FzHja
IwIDAQAB
-----END PUBLIC KEY-----
`

const encryptInstance = new JSEncrypt()
encryptInstance.setPublicKey(key)

const longMessage = JSON.stringify(
  Array.from(new Array(100))
    .fill('壹贰叁肆伍陆柒捌玖拾佰仟')
    .map((i, index) => ({ name: `${index}${i}` }))
)

const ciphertext = encryptInstance.encrypt(longMessage)
console.log(ciphertext)
