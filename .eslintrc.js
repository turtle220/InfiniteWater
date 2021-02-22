module.exports = {
    parser: 'babel-eslint',
    env: {
      browser: true,
      es2020: true,
      node: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 11,
      sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'no-console': 'off',
      'no-await-in-loop': 'off',
      'no-restricted-syntax': [
        'error',
        'ForInStatement',
        'LabeledStatement',
        'WithStatement',
      ],
      'max-classes-per-file': ['error', 2],
    },
  };