module.exports = {
  publicPath: './',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(mdx)(\?.*)?$/,
          use: [
            'babel-loader',
            '@mdx-js/vue-loader'
          ]
        },
        {
          test: /\.(md)(\?.*)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'markdown/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    }
  }
};
