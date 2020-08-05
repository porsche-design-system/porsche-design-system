// eslint-disable-next-line @typescript-eslint/no-var-requires
const { METAICONS_MANIFEST, METAICONS_CDN_BASE_URL }  =
  process.env.NODE_ENV === 'production'
    ? require('@porsche-design-system/assets')
    : require('./tests/unit/assets.package.mock.js');
const { favicon, touchicon, pinnedTab, mstile } = METAICONS_MANIFEST;

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
            track: 'src'
          }
        })
      );
    config.module.rule('media').test(/\.(vtt|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/);
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(md)(\?.*)?$/,
          use: ['vue-loader', '@porsche-design-system/vmark-loader']
        }
      ]
    }
  },
  devServer: {
    progress: false
  },
  pwa: {
    workboxPluginMode: 'GenerateSW',
    name: 'Porsche Design System',
    themeColor: '#FFFFFF',
    msTileColor: '#FFFFFF',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    iconPaths: {
      favicon16: `${METAICONS_CDN_BASE_URL}/${favicon.favicon_16x16}`,
      favicon32: `${METAICONS_CDN_BASE_URL}/${favicon.favicon_32x32}`,
      favicon48: `${METAICONS_CDN_BASE_URL}/${favicon.favicon_48x48}`,
      appleTouchIcon: `${METAICONS_CDN_BASE_URL}/${touchicon.appleTouchIcon_180x180}`,
      maskIcon: `${METAICONS_CDN_BASE_URL}/${pinnedTab.pinnedTabIcon}`,
      msTileImage: `${METAICONS_CDN_BASE_URL}/${mstile.mstile_270x270}`,
    },
    manifestOptions: {
      icons: [{
        'src': `${METAICONS_CDN_BASE_URL}/${touchicon.androidChrome_192x192}`,
        'sizes': '192x192',
        'type': 'image/png'
      }, {
        'src': `${METAICONS_CDN_BASE_URL}/${touchicon.androidChrome_512x512}`,
        'sizes': '512x512',
        'type': 'image/png'
      }],
      background_color: '#FFFFFF'
    }

  }
};
