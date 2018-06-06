const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const production = process.env.NODE_ENV === "production"

const configuration = {
    bail: true,
    entry: ["./src/app/index.js"],
    output: {
        filename: `[name]${production ? ".[chunkhash:8]" : ""}.js`,
        chunkFilename: `[name].chunk${production ? ".[chunkhash:8]" : ""}.js`,
        path: path.resolve(__dirname, "dist"),
        pathinfo: true,
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".jsx"],
        alias: {
            "package.json": path.resolve(__dirname, "package.json"),
            src: path.resolve(__dirname, "src")
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                            babelrc: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: production ? MiniCssExtractPlugin.loader : "style-loader",
                        options: !production
                            ? {
                                  // Style loader options
                                  sourceMap: true
                              }
                            : {}
                    },
                    {
                        loader: "css-loader",
                        query: {
                            modules: false,
                            sourceMap: true,
                            importLoaders: 0,
                            localIdentName: !production ? "[local]__[hash:base64:5]" : "[hash:base64:5]"
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|otf|woff|woff2|eot|svg|png|ico)$/,
                loader: "url-loader",
                query: {
                    limit: 10000,
                    name: `static/media/[name]${production ? ".[hash:8]" : ""}.[ext]`
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/app/index.html",
            versions: {
                pui: require("@porsche/ui-kit-react/package.json").version,
                puid: require("./package.json").version
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css"
        })
    ],
    devServer: {
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/[^/]*\/?[^/]*\/?/,
                    to: "/index.html"
                }
            ],
            disableDotRule: true
        }
    }
}

module.exports = configuration
