import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'

const isPro = process.env.NODE_ENV === 'production'
const file = isPro ? 'index.min.js' : 'index.js'
const plugins = [
  commonjs(),
  resolve(),
  json(),
  esbuild(),
  getBabelOutputPlugin({
    allowAllFormats: true,
    presets: ['@babel/preset-env']
  })
]

if (isPro) {
  plugins.push(terser())
}

export default {
  input: 'src/index.ts',
  output: {
    file: `lib/${file}`,
    format: 'umd',
    name: 'JSEncrypt',
    exports: 'named'
  },
  plugins
}
