import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from "extract-text-webpack-plugin";
export default {
    mode: 'production',
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },
    devtool: 'source-map',
    entry: {
     vendor: path.resolve(__dirname, 'src/vendor'),
     main: path.resolve(__dirname, 'src/index')

    }
    ,
    target: 'web',
    //no physical file just assimilate a file called bundle.js
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    // Webpack 4 removed the commonsChunkPlugin. Use optimization.splitChunks instead.
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        //Hash the files using MD5 so that their names change when the content changes
        new WebpackMd5Hash(),

        new ExtractTextPlugin("[name].[md5:contenthash:hex:20].css"),
        // Use CommonsChunkPlugin to create a separate bundle
        // of vendor libraries so that they're cached separately.
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor'
        // }),

        // Global loader configuration
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            noInfo: false // set to false to see a list of every file being bundled.
        }),
        // Create HTML file that includes reference to bundled JS.
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            // Properties you define here are available in index.html
            // using htmlWebpackPlugin.options.varName
            trackJSToken: "0f74212c304547f09fd9891d28b3e0fc"
        })
    ],
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: ['babel-loader']},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader?sourceMap")}
        ]
    }
}