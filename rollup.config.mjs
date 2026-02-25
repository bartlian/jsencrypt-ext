import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'

const basePlugins = [
  commonjs(),
  resolve(),
  json(),
  esbuild({
    target: 'es2022',
    minify: false
  })
]

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.js',
      format: 'umd',
      name: 'JSEncrypt',
      exports: 'named'
    },
    {
      file: 'lib/index.min.js',
      format: 'umd',
      name: 'JSEncrypt',
      exports: 'named',
      plugins: [terser()]
    },
    {
      file: 'lib/index.mjs',
      format: 'es'
    }
  ],
  plugins: basePlugins
}
