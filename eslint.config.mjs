/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['next/core-web-vitals'],
  rules: {
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    'react-hooks/exhaustive-deps': 'warn'
  }
};

export default config;
