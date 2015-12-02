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
            { test: /\.jade$/, loader: "template-html-loader" }
        ]
    }
};