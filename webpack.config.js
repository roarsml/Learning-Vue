var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
module.exports = {
    entry: "./js/tictactoe.js",
    output: {
        path: __dirname + '/js/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            { test: /\.jade$/, loader: "template-html-loader" },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
        ]
    },
    plugins: [
        new BrowserSyncPlugin(
        {
            host: 'localhost',
            port: 3000,
            server: { 
                baseDir: "./",
                index: "tictactoe.html"
            }
        },
        {
            reload: false
        }
        )
    ]
};