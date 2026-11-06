// @ts-check

import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig(
  globalIgnores(['dist/**', 'node_modules/**']),
  {
    files: ['src/**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      eslintConfigPrettier
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    files: ['test/**/*.mjs', '*.config.mjs'],
    extends: [eslint.configs.recommended, eslintConfigPrettier],
    languageOptions: {
      globals: globals.node
    }
  }
)
