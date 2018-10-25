module.exports = {
    extends: "airbnb",
    rules: {
        "arrow-parens": [2, "always"],
        "arrow-body-style": [2, "always"],
        "comma-dangle": [2, "never"],
        "global-require": 0,
        "import/extensions": 0,
        "import/first": 0,
        "import/no-dynamic-require": 0,
        "import/no-extraneous-dependencies": 0,
        "import/no-unresolved": 0,
        "import/no-webpack-loader-syntax": 0,
        "import/prefer-default-export": false,
        indent: [2, 4],
        "jsx-quotes": [2, "prefer-double"],
        "max-len": 0,
        "no-underscore-dangle": 0,
        "no-use-before-define": [2, { functions: false }],
        quotes: [2, "double", "avoid-escape"],
        "react/jsx-filename-extension": [2, { extensions: [".js"] }],
        "react/jsx-indent": [2, 4],
        "react/jsx-indent-props": [2, 4],
        "react/no-array-index-key": 0,
        "react/no-unused-prop-types": 0,
        "react/require-default-props": 0,
        semi: [2, "never"]
    }
}
