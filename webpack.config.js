const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpack = require("webpack");
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

module.exports = {
    mode: 'development',
    entry: [
        "./src/fill.js",
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js')
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "static/favicon.ico" },
            ],
        }),
        new AddAssetHtmlPlugin([
            { filepath: require.resolve('./static/js/static.bundle.js'), publicPath: '' },
            { filepath: require.resolve('./static/js/2.46573e9c.chunk.js'), publicPath: '' },
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devtool: isDev ? 'source-map' : false,
    devServer: {
        contentBase: './dist',
        open: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/inline',
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        node: "current"
                                    }
                                }
                            ]
                        ],
                        plugins: [
                            "@babel/plugin-proposal-class-properties",
                            "@babel/plugin-syntax-object-rest-spread",
                            "@babel/plugin-proposal-object-rest-spread",
                            "@babel/plugin-transform-arrow-functions",
                            "@babel/plugin-proposal-private-methods",
                            "@babel/plugin-proposal-optional-chaining",
                            "@babel/plugin-proposal-nullish-coalescing-operator"
                        ]
                    }
                }
            },
        ],
    },
};
