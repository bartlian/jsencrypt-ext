#!/usr/bin/env zx
/* eslint-disable no-undef */

const main = async () => {
  // 1. 清理目录
  await $`rm -rf lib`

  // 2. 并行执行构建
  console.log(chalk.blue('📦 Building bundles...'))
  await $`rollup -c`

  // 3. 生成类型
  console.log(chalk.blue('⌨️ Generating types...'))
  await $`pnpm build:types`

  console.log(chalk.green('✅ Library build complete!'))
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
