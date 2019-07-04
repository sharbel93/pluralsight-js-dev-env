import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    mode: 'production',
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    devtool: 'source-map',
    entry: [
        path.resolve(__dirname, 'src/index')
    ],
    target: 'web',
    //no physical file just assimilate a file called bundle.js
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        // Global loader configuration
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            noInfo: true // set to false to see a list of every file being bundled.
        }),
        // Create HTML file that includes reference to bundled JS.
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: true
        })
    ],
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: ['babel-loader']},
            {test: /\.css$/, use: ['style-loader', 'css-loader']}
        ]
    }
}