module.exports = {
  env: {
    browser: true,
    es6: true
  },
  globals: {
    React: 'writable'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'standard',
    'standard-jsx'
  ],
  rules: {
    'no-console': 'error',
    'linebreak-style': [
      'error',
      'unix'
    ],
    'react/jsx-no-bind': ['error', {
      allowArrowFunctions: true,
      allowBind: false,
      ignoreRefs: true
    }],
    'default-param-last': 'off',
    'react/prop-types': 'off',
    'react/no-did-update-set-state': 'error',
    'react/no-unknown-property': 'error',
    'jsx-quotes': ['error', 'prefer-single'],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-key': 'error',
    'react/self-closing-comp': 'error',
    'template-curly-spacing': 'off'
  }
}
