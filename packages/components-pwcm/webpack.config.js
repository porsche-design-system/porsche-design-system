const webpack = require('webpack');
const environment = require('./environment');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: environment.cdnDistPath,
    filename: `porsche-design-system.${environment.version}.js`,
    chunkFilename:`[id].porsche-design-system.[contenthash].js`,
    libraryTarget: 'var',
    library: `PorscheDesignSystem_${environment.snakeCaseVersion}`,
    publicPath: `${environment.deployUrl}/`
  },
  plugins: [
    new webpack.DefinePlugin({
      PORSCHE_DESIGN_SYSTEM_VERSION: JSON.stringify(environment.version)
    })
  ]
}
