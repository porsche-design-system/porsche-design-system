module.exports = {
  semi: true,
  tabWidth: 2,
  proseWrap: 'never',
  printWidth: 120,
  arrowParens: 'always',
  singleQuote: true,
  vueIndentScriptAndStyle: true,
  overrides: [
    {
      files: ['**/*.css', '**/*.scss'],
      options: {
        singleQuote: false
      }
    }
  ]
};
