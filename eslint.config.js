const js = require('@eslint/js');
const cds = require('@sap/eslint-plugin-cds');
const globals = require('globals');
module.exports = [
  {
    files: ['srv/**/*.js'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'script',
      globals: {
        ...globals.node,
        ...cds.configs['recommended-legacy'].globals
      }
    },
    plugins: {
      '@sap/cds': cds
    },
    rules: {
      ...js.configs.recommended.rules,
      ...cds.configs['recommended-legacy'].rules,
      'no-console': 'off',
      'require-atomic-updates': 'off',
      'no-prototype-builtins': 'off'
    }
  }
];
