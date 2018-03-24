let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');

module.exports = {
    context: path.join(__dirname, '/assets'),
    entry: {
        'common': './scripts/common.ts',
        'main': './pages/main/index.ts'
    },
    output: {
        // path: 'dist',
        path: path.resolve(__dirname, 'public'),
        publicPath: "/",
        filename: '[name]/[name].js'
    },
    devtool: "source-map",
    resolve: {
        alias: {
            '@root': path.resolve(__dirname, 'assets')
        },
        extensions: ['.ts', '.tsx', '.js', '.css', '.sass', '.scss', '.pug', '.jade']
    },
    module: {
        rules: [
            {
                test: /\.pug$|\.jade$/,
                loader: 'pug-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('precss'), // можно использовать переменные в css -> $blue: #056ef0;
                                    require('autoprefixer') // авторасстановка префиксов для всех браузеров
                                ];
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer') // авторасстановка префиксов для всех браузеров
                                    ];
                                }
                            }
                        },
                        'resolve-url-loader', // resolve problems with url(...)
                        'sass-loader?sourceMap' // compiles Sass to CSS
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: path.resolve(__dirname, 'assets/tsconfig.json')
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // вынести общую часть из всех точек входа в отдельный файл
        new webpack.optimize.CommonsChunkPlugin({
            name: ['common']
        }),
        new ExtractTextPlugin({
            filename: "[name]/[name].css",
            allChunks: true // выносить стили из всех js(не только из главных)
        })
    ],
    devServer: {
        host: "localhost",
        port: 8000,
        stats: {
            colors: true
        }
    }
};