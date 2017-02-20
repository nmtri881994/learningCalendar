/**
 * Created by XuanVinh on 2/20/2017.
 */
var config = {
    entry: './src/main.js',

    output: {
        path:'/',
        filename: 'index.js',
    },

    devServer: {
        inline: true,
        port: 3000
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
            }
        ]
    }
}

module.exports = config;