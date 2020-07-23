// eslint-disable-next-line @typescript-eslint/no-var-requires
const metaicons = require('@porsche-design-system/assets');

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
      favicon16: `${metaicons.METAICONS_CDN_BASE_URL}/${metaicons.METAICONS_MANIFEST.favicon.favicon_16x16}`,
      favicon32: `${metaicons.METAICONS_CDN_BASE_URL}/${metaicons.METAICONS_MANIFEST.favicon.favicon_32x32}`,
      favicon48: `${metaicons.METAICONS_CDN_BASE_URL}/${metaicons.METAICONS_MANIFEST.favicon.favicon_48x48}`,
      appleTouchIcon: `${metaicons.METAICONS_CDN_BASE_URL}/${metaicons.METAICONS_MANIFEST.touchicon.appleTouchIcon_180x180}`,
      maskIcon: `${metaicons.METAICONS_CDN_BASE_URL}/${metaicons.METAICONS_MANIFEST.pinnedTab.pinnedTabIcon}`,
      msTileImage: `${metaicons.METAICONS_CDN_BASE_URL}/${metaicons.METAICONS_MANIFEST.mstile.mstile_270x270}`,
    },
    manifestOptions: {
      icons: [{
        'src': `${metaicons.METAICONS_CDN_BASE_URL}/${metaicons.METAICONS_MANIFEST.touchicon.androidChrome_192x192}`,
        'sizes': '192x192',
        'type': 'image/png'
      }, {
        'src': `${metaicons.METAICONS_CDN_BASE_URL}/${metaicons.METAICONS_MANIFEST.touchicon.androidChrome_512x512}`,
        'sizes': '512x512',
        'type': 'image/png'
      }],
      background_color: '#FFFFFF'
    }

  }
};
