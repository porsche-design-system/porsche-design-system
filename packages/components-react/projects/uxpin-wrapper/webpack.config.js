const path = require('path');

// Source: https://merge-tech.slack.com/archives/C01SWQ67CSW/p1620356760000200
module.exports = {
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: 'last 2 versions', // solution for local `yarn start` where optional chaining `.?` otherwise fails
              },
            ],
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
              },
            ],
            '@babel/preset-typescript',
          ],
        },
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
      },
    ],
  },
};
