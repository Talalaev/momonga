const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

    output: {
        // path: path.resolve(__dirname, 'dist'),
        path: helpers.root('dist'),
        publicPath: "http://localhost:3000/client/dist",
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin({
            filename: "[name].css"
        })
    ],
    devServer: {
        host: "localhost",
        port: 8000,
        stats: {
            colors: true
        }
    }
});
