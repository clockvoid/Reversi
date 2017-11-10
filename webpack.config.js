module.exports = {
    entry: './app.ts',
    output: {
        filename: './dist/bundle.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['*', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                }
            }
        ]
    }
};
