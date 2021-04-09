const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    entry: {
        jazz_serif: './src/scss/jazz_serif.scss',
        jazz_sans: './src/scss/jazz_sans.scss',
        jazz_fonts: './src/scss/jazz_fonts.scss',
        jazz_behavior: './src/jazz_behavior.ts'
    },

    // stats : "verbose",

    output: {
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.scss', '.css' ],
    },
    module: {
        rules: [
            // Typescript
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // SCSS modules (.scss, but not .module.scss) that will be included in the global stylesheet.
            {
                test: /\.s([ac])ss$/,
                exclude: [/\.module.(s([ac])ss)$/],
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
                exclude: /(\/fonts)/,
                use: [
                    'url-loader',
                    'svg-transform-loader' // allows transformation of svg to set fill/stroke values
                ]
            },
            // fonts
            {
                test: /(fonts).*\.(ttf|otf|eot|svg|woff(2)?)(\?[#a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/icons', to: 'icons' },
                { from: 'src/logos', to: 'logos' },
                { from: 'src/img', to: 'img' },
                { from: 'LICENSE.md', to: 'LICENSE.md' },
                { from: 'package-lib.json', to: 'package.json' },
            ],
        })
    ]
};
