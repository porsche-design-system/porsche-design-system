module.exports = {
  publicPath: './',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(md)(\?.*)?$/,
          use: [
            'vue-loader',
            'vmark-loader'
          ]
        }
      ]
    }
  }
};
