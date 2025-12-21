import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['dist'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      prettier,
    ],
    plugins: {
      import: importPlugin,
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: './lib/**',
              group: 'sibling',
              position: 'before',
            },
            {
              pattern: './model/**',
              group: 'sibling',
              position: 'before',
            },
            {
              pattern: './store/**',
              group: 'sibling',
              position: 'before',
            },
            {
              pattern: './ui/**',
              group: 'sibling',
              position: 'before',
            },
            // shared
            {
              pattern: '@/shared/lib/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/shared/model/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/shared/store/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/shared/ui/**',
              group: 'internal',
              position: 'before',
            },
            // entities
            {
              pattern: '@/entities/**/lib/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/entities/**/model/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/entities/**/store/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/entities/**/ui/**',
              group: 'internal',
              position: 'before',
            },
            // features
            {
              pattern: '@/features/**/lib/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/features/**/model/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/features/**/store/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/features/**/ui/**',
              group: 'internal',
              position: 'before',
            },
            // widgets
            {
              pattern: '@/widgets/**/lib/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/widgets/**/model/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/widgets/**/store/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/widgets/**/ui/**',
              group: 'internal',
              position: 'before',
            },
            // pages
            {
              pattern: '@/pages/**/lib/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/pages/**/model/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/pages/**/store/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/pages/**/ui/**',
              group: 'internal',
              position: 'before',
            },
            // apps
            {
              pattern: '@/apps/**/lib/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/apps/**/model/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/apps/**/store/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/apps/**/ui/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
  },
]);
