// eslint-disable-next-line @typescript-eslint/no-var-requires
const { META_ICONS_MANIFEST, META_ICONS_CDN_BASE_URL } =
  process.env.NODE_ENV !== 'test'
    ? require('@porsche-design-system/assets')
    : require('./tests/unit/assets.package.mock.js');
const { favicon, touchIcon, pinnedTab, mstile } = META_ICONS_MANIFEST;

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
          use: ['vue-loader', '@porsche-design-system/vmark-loader'],
        },
      ],
    },
  },
  devServer: {
    progress: false,
  },
  pwa: {
    workboxPluginMode: 'GenerateSW',
    name: 'Porsche Design System',
    themeColor: null,
    msTileColor: null,
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    iconPaths: {
      favicon16: null,
      favicon32: null,
      favicon48: null,
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: null,
    },
  },
};
