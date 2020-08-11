module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jquery: true,
    browser: true,
    greasemonkey: true
  },
  globals: {
    '__PTM_BRIDGE__': true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-var-requires': 0,
  }
}
