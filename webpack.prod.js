const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
    entry: {
        home: './src/js/home.js',
        iframe_height: './src/js/iframe_height.js',
        table_of_contents: './src/js/table_of_contents.js',
        display_custom_properties: './src/js/display_custom_properties.js',
        prism: './src/js/prism.js',
    },
    mode: 'production',
    target: 'browserslist',
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env"
                            ]
                        ],
                        plugins: [
                            "@babel/plugin-transform-shorthand-properties",
                            "@babel/plugin-proposal-object-rest-spread",
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer"
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        new CssMinimizerPlugin()
    ]
});