module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.(md)(\?.*)?$/)
      .use('file-loader')
      .loader('file-loader')
      .tap(options => {
        return {...options, ...{name: 'markdown/[name].[hash:8].[ext]'}};
      })
      .end()
  }
};
