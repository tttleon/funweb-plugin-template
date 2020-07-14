const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: './src/index.js',
    devtool: false,
    output: {
        libraryTarget: "umd",
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
    },
    externals: {
        react: "react",
        "react-dom": "react-dom",
        "react-router-dom": "react-router-dom",
        "react-relay": "react-relay",
        graphql: "graphql",
        "funweb-lib": "funweb-lib",
        antd: "antd",
        "@ant-design/icons": "@ant-design/icons",
        moment: "moment",
        "moment/locale/zh-cn": "moment/locale/zh-cn"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            { 
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: (resourcePath) => {
                                    if (/global.css$/i.test(resourcePath)) {
                                        return 'global';
                                    }
                                    return 'local';
                                },
                                localIdentName: '[hash:base64]',
                            },
                        }
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
};