module.exports = {
    entry: './src/index.js',
    mode: 'development',
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                loaders: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: 'index.js',
        path: `${__dirname}/dist`
    }
};
