const path = require('path');
const webpack = require('webpack');

const port = 8081;
module.exports = {
    devServer: {
        compress: true,
        host: "0.0.0.0",
        port: port,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
        },
        hot: true
    },
    entry: './src/index.js',
    output: {
        libraryTarget: "commonjs",
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: 'http://localhost:' + port,
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
            }
        ]
    }
};