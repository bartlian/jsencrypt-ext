import { defineConfig } from 'eslint/config'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended, {
  rules
} from 'eslint-plugin-prettier/recommended'
import globals from 'globals'

export default defineConfig(
  {
    ignores: ['dist/**', 'node_modules/**', 'tsup.config.ts']
  },

  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off'
    }
  }
)
