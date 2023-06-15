const webpack = require('webpack');
const pkgJson = require('./package.json');

module.exports = {
  publicPath: './',
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) =>
        Object.assign(options, {
          transformAssetUrls: {
            track: 'src',
          },
        })
      );
    config.module.rule('media').test(/\.(vtt|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/);
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(md)(\?.*)?$/,
          use: ['vue-loader', 'vmark-loader'],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        ROLLUP_REPLACE_IS_STAGING: '"production"',
        ROLLUP_REPLACE_VERSION: `"${pkgJson.dependencies['@porsche-design-system/components-js']}"`,
      }),
    ],
  },
  devServer: {
    progress: false,
  },
};
