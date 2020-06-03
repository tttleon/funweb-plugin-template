https://zhuanlan.zhihu.com/p/57151959
https://www.valentinog.com/blog/babel/
https://zhuanlan.zhihu.com/p/57151959

# Creating Remote Components

how to install and configure webpack
how to install and configure Babel
how to install React
how to include the resulting bundle into an HTML page
how to install and configure webpack dev server




mkdir HelloWorldx
cd HelloWorldx
yarn init -y

yarn add webpack webpack-dev-server webpack-cli --dev
yarn add @babel/core babel-loader @babel/preset-env @babel/preset-react --dev
yarn add react react-dom react-relay relay-config --dev
yarn add babel-plugin-relay graphql relay-compiler --dev
yarn add @babel/plugin-proposal-class-properties  --dev
yarn add babel-plugin-macros --dev
yarn add style-loader css-loader --dev
yarn add sass-loader node-sass --dev
<!-- yarn add @babel/plugin-proposal-export-default-from -D      --@todo -->

//

yarn add react react-dom --dev
yarn add @babel/cli @babel/core @babel/preset-env @babel/preset-react --dev
yarn add webpack webpack-cli webpack-dev-server webpack-merge --dev
yarn add babel-loader --dev
yarn add react-router-dom --dev
yarn add @babel/plugin-proposal-class-properties  --dev



package.json
"scripts": {
    "start": "webpack-dev-server --mode development",
    "build": "webpack --mode production",
    "relay": "get-graphql-schema http://127.0.0.1:8080/api/graphql > ./schema.graphql && relay-compiler --src ./src --schema ./schema.graphql --watch"
},

.babelrc
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react",
    ],
    "plugins": [
    	"@babel/plugin-proposal-class-properties",
	    "relay"
	  ]
}


webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
    devServer: {
        compress: true,
        port: 8081,
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
        publicPath: 'http://localhost:8081/',
    },
    externals: {
        react: "react",
        "prop-types": "prop-types",
        antd: "antd",
        "react-router-dom": "react-router-dom",
        moment: "moment",
        "react-relay": "react-relay"
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

#touch index.js
import React from "react";

const RemoteComponent = () => {
    return <div>Hello Remote World !</div>;
};

export default RemoteComponent;



#relay.config.js
module.exports = {
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: "./src",
  schema: "./data/schema.graphql",
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
}