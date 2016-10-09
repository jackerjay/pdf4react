var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'eventsource-polyfill', // necessary for hot reloading with IE
        // 'webpack-hot-middleware/client',
        './index.js',
        'webpack-dev-server/client?http://localhost:8428',
        'webpack/hot/only-dev-server'
    ],
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        chunkFilename: '[id].chunk.[chunkhash:8].js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin("[name].css"),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ],
    module: {

        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: ['react-hot','babel'],
                exclude: [nodeModulesPath]
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules&localIdentName=[name]_[local]-[hash:base64:5]&&root=.'
            },{
                test: /\.(ttf|eot|svg|woff|woff2|pdf)/,
                loader: 'file-loader',
            },
            {
                test: /\.(png|jpg|jpeg|gif|cur)$/, loader: 'url-loader?limit=8192'
            }
        ]
    }
};

