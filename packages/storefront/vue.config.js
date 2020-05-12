module.exports = {
  publicPath: './',
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => Object.assign(options, {
        transformAssetUrls: {
          track: 'src'
        }
      }));
    config.module
      .rule('media')
      .test(/\.(vtt|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
    config.module
      .rule('files')
      .test(/\.(sketch|zip)(\?.*)?$/)
  },
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
