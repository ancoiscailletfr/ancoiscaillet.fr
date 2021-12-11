module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    React: 'writable',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        extensions: ['.js'],
        map: [['@', '.']],
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  rules: {
    'no-console': 'error',
    'linebreak-style': [
      'error',
      'unix',
    ],
    'react/jsx-no-bind': ['error', {
      allowArrowFunctions: true,
      allowBind: false,
      ignoreRefs: true,
    }],
    'arrow-body-style': 'off',
    'default-param-last': 'off',
    'react/prop-types': 'off',
    'react/no-did-update-set-state': 'error',
    'react/no-unknown-property': 'error',
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-filename-extension': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'no-shadow': 'off',
    semi: 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-key': 'error',
    'react/self-closing-comp': 'error',
    'template-curly-spacing': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'warn',
  },
};
