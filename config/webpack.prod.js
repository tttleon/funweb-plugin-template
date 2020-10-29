const package = require("../package.json");
const path = require('path');
var ZipPlugin = require('zip-webpack-plugin');


module.exports = {
    mode: "production",
    entry: './src/index.js',
    devtool: false,
    output: {
        libraryTarget: "umd",
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]_' + package.version + '.js',
        publicPath: '/app/web/' + package.name.toLocaleLowerCase() + "/",
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
    plugins: [
        new ZipPlugin({
            path: './release/',
            filename: `${package.name.toLocaleLowerCase()}_web_${package.version}.zip`,
            extension: 'zip',
            pathPrefix: 'app/web/' + package.name.toLocaleLowerCase(),
            // pathMapper: function (assetPath) {
            //     // put all pngs in an `images` subdir
            //     if (assetPath.endsWith('.png'))
            //         return path.join(path.dirname(assetPath), 'images', path.basename(assetPath));
            //     return assetPath;
            // },
            include: [/\.js$/, /\.(png|svg|jpg|gif)$/, /\.(woff|woff2|eot|ttf|otf)$/,/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/],
            exclude: [/\.htm$/, /\.html$/],
            fileOptions: {
                mtime: new Date(),
                mode: 0o100664,
                compress: true,
                forceZip64Format: false,
            },
            zipOptions: {
                forceZip64Format: false,
            },
        })
    ],
    resolve: {
        alias: {
            'src': path.resolve('src')
        }
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        options: {
                            formatter: require.resolve('react-dev-utils/eslintFormatter'),
                            eslintPath: require.resolve('eslint'),
                            failOnError: true,
                        },
                        loader: 'eslint-loader',
                    },
                ],
            },
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
                test: /\.scss$/i,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: (resourcePath) => {
                                    if (/global.scss$/i.test(resourcePath)) {
                                        return 'global';
                                    }
                                    return 'local';
                                },
                                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            },
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|svg|jpe?g|gif)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'media',
                            // publicPath: '/app/web/' + package.name.toLocaleLowerCase(),
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash:8].[ext]',
                            outputPath: 'audio'
                        }
                    }
                ]
            }
        ]
    },
};
