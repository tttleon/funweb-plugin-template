const path = require('path');
const webpack = require('webpack');

const port = 8081;
module.exports = {
    devServer: {
        compress: true,
        port: port,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
        },
        hot: true
    },
    entry: './index.js',
    output: {
        libraryTarget: "commonjs",
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: 'http://localhost:' + port,
    },
    externals: {
        react: "react",
        // "prop-types": "prop-types",
        "react-router-dom": "react-router-dom",
        "react-relay": "react-relay",
        antd: "antd",
        moment: "moment"
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