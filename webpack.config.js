module.exports = {
    output: {
        filename: 'bundle.js',
    },
    devtool: 'sourcemap',
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, ]
    }
};
