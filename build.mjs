#!/usr/bin/env zx
/* eslint-disable no-undef */

const build = env => {
  $`rollup -c --environment NODE_ENV:${env}`
}

const main = () => {
  build('development')
  build('production')
}

main()
