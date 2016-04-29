var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var frontEndApp = path.resolve(__dirname, './front-end/');

module.exports = {
    entry: {
        javascripts: path.resolve(frontEndApp, 'app/main.jsx')
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: '[name].js',
        publicPath: '/',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url?limit=10000'
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose?$!expose?jQuery'
            },
        ],
        noParse: [
            /\/flux.js/,
            /\/flux-utils.js/
        ]
    },
    postcss: function () {
        return [precss, autoprefixer];
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin({
            filename: 'vendor.js',
            name: 'vendor'
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            '@pages': path.resolve(frontEndApp, 'app/pages'),
            '@common': path.resolve(frontEndApp, 'app/common/index'),
            'dispatcher': path.resolve(frontEndApp, 'app/dispatcher'),
            'flux': path.resolve(frontEndApp, 'app/libs/flux/flux'),
            'flux-utils': path.resolve(frontEndApp, 'app/libs/flux/flux-utils')
        }
    }
};