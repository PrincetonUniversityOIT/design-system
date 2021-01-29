const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    // mode: 'development',

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
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
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
                    'svg-transform-loader/encode-query', // necessary to encode hash (#) for params in svg-transform-loader
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            // SVG
            {
                test: /\.svg(\?.*)?$/, // match img.svg and img.svg?param=value
                // test: /\.svg$/,
                // loader: 'svg-url-loader'
                use: [
                    'url-loader',
                    'svg-transform-loader' // allows transformation of svg to set fill/stroke values
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
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js', to: 'webcomponents-bundle.js' },
                { from: 'src/icons', to: 'icons' },
                { from: 'src/logos', to: 'logos' }
            ],
        })
    ]
};
