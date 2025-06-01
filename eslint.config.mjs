import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import * as espree from 'espree' // Import espree correctly

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const eslintConfig = [
    ...compat.extends('next/core-web-vitals'),
    ...compat.extends('plugin:prettier/recommended'),

    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            sourceType: 'module',
            parser: espree, // Use the named import
        },
        rules: {
            'new-cap': 'off',
            'no-var': 'error',
            'no-alert': 'error',
            'max-depth': 'error',
            'max-lines': ['error', { max: 350 }],
            'no-shadow': 'error',
            'no-console': 'error',
            'no-debugger': 'error',
            'require-jsdoc': 'off',
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'prefer-arrow-callback': 'error',
            'max-lines-per-function': 'off',
            'max-statements-per-line': ['error', { max: 1 }],
            'lodash/prefer-lodash-method': 'off',
            'react-hooks/exhaustive-deps': 'off',
            'react/no-unknown-property': 'off',
            'tailwindcss/no-custom-classname': 'off',
            'prettier/prettier': 'warn',
        },
    },
]

export default eslintConfig
