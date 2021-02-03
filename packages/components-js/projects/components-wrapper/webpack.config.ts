import * as webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { cdnDistPath, deployUrl, snakeCaseVersion, version } from './environment';
const CustomNamedChunkIdsPlugin = require('./CustomNamedChunkIdsPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config: webpack.Configuration = {
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
      analyzerMode: 'disabled', // comment this line or change to 'server' | 'static' to get interactive html
      generateStatsFile: true,
    }),
  ],
};

export default config;
