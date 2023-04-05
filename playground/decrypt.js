const JSEncrypt = require('../lib/index').default

const key = `
-----BEGIN PRIVATE KEY-----
MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAKSbBdrtJ7iULjpv
0gHy7qX1LaplO2tbe7t7mgJOUzWqWL1daBTXCRukufR46Vcx50Lm+X8BLf3wVSlo
W0QhRqO5ijSkMFh52seZ27t3uxsdpL7yC7KRngyP3JIaA6aLjIn3efhr3kVK6q/L
Lg+4zkuW+ZN9NAs6msj9Xqe4oTM3AgMBAAECgYEAixrXH+Q7JSlUx92nxC3gsC86
oD1csaVmM1KJHFnEyB1lUOKXCsWO1OWooIlt6For7cX0IviEPY3U6mFef3z/jBI0
hlV+XS78kvjkEB4l8/kbc07755lKwc3j7r5/UkU3vIGl1pcvi8EmGGNiZwRldH0E
WZ4f88yLOM1xJQDRFwECQQDSvPDyioIu/B+Ctn+Vc+4hNOhYzE858O2f3NmlhI+D
HS+ZYHmD25Kj+x2xeEBl5EOp7nUq8HoUCoFt9k4E4DZxAkEAx/WRcyII0SEiY5V1
Q4oiJ+OPQaZg/SSLzFzF8Nzv45hthBC7FWQyHNnIj/2Sy8/rltfo80vzwCzucI8O
JYtoJwJBAKTbxE6pRmCFQg1awYJkV+TIY/+bjVsRfIN0HRvcEP0MJwGAtG8Ppa78
suTz4sUTBk/4yNZXm9jzwv8IEU7FLDECQQDAoKKzxQ+1VzQntu02WTW6M4/n8H3y
n2hFQQI2nMBEAq1N0khHvTRBctOxUtg9m1kbAXgaGQsCEMbKjCVWqct1AkAhf218
YFNiDcn/orcpDojOa7l3kTvAZj6GQCue9ui8I06sTrYviZC07KKz3jvL8MRQar8h
x3UWWTM/UxZsajD9
-----END PRIVATE KEY-----
`

const longCiphertext = `
Foyabxpiv2/2xVYj3/V1TMt1yTU4qAKeIrNm3G6GK+GkZ6/QZ5Oc7rYs9S/JJvZQKzmJCbpLbv0oF+/DyMtIhObJNdOZ1nxCNq9s7JqDYSpXXbJrt3rLOu88ISfGyCdWtF2DDi+N8D9zml8F2ziBFExHvKmcz3JaJCQ7Uli659g=
`
const decryptInstance = new JSEncrypt()
decryptInstance.setPrivateKey(key)

const plaintext = decryptInstance.decrypt(longCiphertext)

console.log(plaintext)
