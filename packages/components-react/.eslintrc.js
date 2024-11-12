module.exports = {
  extends: ['react-app'],
  overrides: [
    {
      files: ['src/**/*.tsx'],
      rules: {
        'react/jsx-pascal-case': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
      },
    },
  ],
};
