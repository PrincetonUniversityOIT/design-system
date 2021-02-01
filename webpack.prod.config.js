const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    mode: 'production',

    // creates 2 entry points, one for Typescript and the other for Global CSS

    entry: {
        index: './src/index.ts',
        styles: './src/scss/jazz_serif.scss'
    },

    // Output will be based on the name of the entry point.
    //
    // Unfortunately, there is a bug in Webpack that will cause an extra .js file to be produced for the CSS. But that
    // file can just be ignored (or removed during deployment).

    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },

    optimization: {
        minimize: true,
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },

    module: {
        rules: [
            // transpile js/jsx files with babel-loader
            {
                test: /\.([tj])sx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            // SCSS modules (.module.scss) will be included in javascript.
            {
                test: /\.module\.s([ac])ss$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: false
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            },
            // SCSS modules (.scss, but not .module.scss) that will be included in the global stylesheet.
            {
                test: /\.s([ac])ss$/,
                exclude: /\.module.(s([ac])ss)$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            }
        ]
    },

    // resolve...eliminates the need to include extensions in import statements
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css'
        })
    ]
};
