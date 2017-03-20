/**
 * Created by XuanVinh on 2/20/2017.
 */
var config = {
    entry: './src/index.js',

    output: {
        path:'/',
        filename: 'bundle.js',
    },

    devServer: {
        hot: true,
        inline: true,
        port: 3000,
        historyApiFallback: true
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }
}

module.exports = config;