const webpack = require ('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { cdnDistPath, deployUrl, snakeCaseVersion, version } = require('./environment');
const CustomNamedChunkIdsPlugin = require('./CustomNamedChunkIdsPlugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  entry: './projects/components-wrapper/src/index.js',
  stats: {
    chunks: true,
    modules: true,
  },
  output: {
    path: cdnDistPath,
    filename: `porsche-design-system.v${version}.[contenthash].js`,
    chunkFilename: `porsche-design-system.[id].[contenthash].js`,
    libraryTarget: 'var',
    library: `PorscheDesignSystem_${snakeCaseVersion}`,
    publicPath: `${deployUrl}/`,
  },
  optimization: {
    // https://webpack.js.org/guides/code-splitting/
    // https://webpack.js.org/plugins/split-chunks-plugin/
    splitChunks: {
      minSize: 30000,
    },
    usedExports: true,
    chunkIds: false, // when this is set false, we need to provide a custom plugin to generate our chunkIds
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      PORSCHE_DESIGN_SYSTEM_VERSION: JSON.stringify(version),
    }),
    new CustomNamedChunkIdsPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // comment this line or change to 'server' | 'static' to get interactive html
      openAnalyzer: false,
      generateStatsFile: true,
      reportFilename: '../../tests/unit/results/report.html',
      statsFilename: '../../tests/unit/results/stats-raw.json',
    }),
  ],
};

