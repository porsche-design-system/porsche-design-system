const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const configuration = {
    bail: true,
    entry: ['./src/index.tsx', './src/styles/global.scss'],
    output: {
        filename: `[name]${production ? '.[chunkhash:8]' : ''}.js`,
        chunkFilename: `[name].chunk${production ? '.[chunkhash:8]' : ''}.js`,
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        alias: {
            src: path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                include: path.resolve(__dirname, "src"),
                loader: 'tslint-loader',
                options: {
                    tsConfigFile: 'tsconfig.json'
                }
            },
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, "src"),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                          babelrc: true,
                          plugins: ['react-hot-loader/babel'],
                        },
                    },
                    StringReplacePlugin.replace({
                        replacements: [{
                            pattern: /\/\*\* @class \*\//ig,
                            replacement: function (match, p1, offset, string) {
                                return "/*@__PURE__*/";
                            }
                        }]
                    }),
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "node_modules/@porsche/ui-kit-react"),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: true
                        }
                    }
                ]
            },
            {
                test: /\.s?css$/,
                include: [
                    path.resolve(__dirname, "src", "shared"),
                    path.resolve(__dirname, "src", "post"),
                    path.resolve(__dirname, "src", "stream")
                ],
                use: [
                    {
                        loader: production ? MiniCssExtractPlugin.loader : "style-loader",
                        options: !production ? {
                            // Style loader options
                            sourceMap: true,
                            convertToAbsoluteUrls: true
                        } : {}
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: production,
                            sourceMap: !production,
                            modules: true,
                            camelCase: true,
                            importLoaders: 2,
                            localIdentName: production ? '[hash:base64]' : '[path][name]__[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: "resolve-url-loader",
                        options: {
                            sourceMap: !production
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            outputStyle: 'uncompressed'
                        }
                    }
                ]
            },
            {
                test: /\.s?css$/,
                exclude: [
                    path.resolve(__dirname, "src", "shared"),
                    path.resolve(__dirname, "src", "post"),
                    path.resolve(__dirname, "src", "stream")
                ],
                use: [
                    {
                        loader: production ? MiniCssExtractPlugin.loader : "style-loader",
                        options: !production ? {
                            // Style loader options
                            sourceMap: true,
                            convertToAbsoluteUrls: true
                        } : {}
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: production,
                            sourceMap: !production,
                            modules: false,
                            camelCase: true,
                            importLoaders: 2,
                            localIdentName: production ? '[hash:base64]' : '[path][name]__[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: "resolve-url-loader",
                        options: {
                            sourceMap: !production
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            outputStyle: 'uncompressed'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg|png|jpg|jpeg)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: `static/media/[name]${production ? '.[hash:8]' : ''}.[ext]`
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css"
        }),
        new StringReplacePlugin()
    ],
    devServer: {
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/[^/]*\/?[^/]*\/?/,
                    to: '/index.html'
                }
            ],
            disableDotRule: true
        }
    }
};

module.exports = configuration;
