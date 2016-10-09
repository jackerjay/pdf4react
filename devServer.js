var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

new WebpackDevServer(webpack(config), {
    contentBase: '',
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(8428, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at locallhost:8428');
});