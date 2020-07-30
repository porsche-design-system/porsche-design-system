const webpack = require('webpack');
const environment = require('./environment');

module.exports = {
  mode: 'production',
  entry: './projects/components-wrapper/src/index.js',
  output: {
    path: environment.cdnDistPath,
    filename: `porsche-design-system.v${environment.version}.js`,
    chunkFilename: `porsche-design-system.[id].[contenthash].js`,
    libraryTarget: 'var',
    library: `PorscheDesignSystem_${environment.snakeCaseVersion}`,
    publicPath: `${environment.deployUrl}/`
  },
  optimization: {
    usedExports: true
  },
  plugins: [
    new webpack.DefinePlugin({
      PORSCHE_DESIGN_SYSTEM_VERSION: JSON.stringify(environment.version)
    })
  ]
};
