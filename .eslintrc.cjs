module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // if you use TS
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off', // 👈 disable old rule
    'react/prop-types': 'off', // if you’re using TS instead of PropTypes
    '@typescript-eslint/no-unused-vars': ['warn'], // TS-specific
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
