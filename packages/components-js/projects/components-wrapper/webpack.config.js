const webpack = require('webpack');
const { cdnDistPath, deployUrl, snakeCaseVersion, version } = require('./environment');

module.exports = {
  mode: 'production',
  entry: './projects/components-wrapper/src/index.js',
  output: {
    path: cdnDistPath,
    filename: `porsche-design-system.v${version}.[contenthash].js`,
    chunkFilename: `porsche-design-system.[id].[contenthash].js`,
    libraryTarget: 'var',
    library: `PorscheDesignSystem_${snakeCaseVersion}`,
    publicPath: `${deployUrl}/`
  },
  optimization: {
    usedExports: true
  },
  plugins: [
    new webpack.DefinePlugin({
      PORSCHE_DESIGN_SYSTEM_VERSION: JSON.stringify(version)
    })
  ]
};
