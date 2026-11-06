// @ts-check

import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  platform: 'neutral',
  target: 'es2020',
  dts: true,
  clean: true,
  minify: true,
  fixedExtension: true,
  failOnWarn: true,
  deps: {
    onlyBundle: ['jsencrypt']
  },
  outputOptions: {
    exports: 'named'
  },
  publint: true,
  attw: true
})
