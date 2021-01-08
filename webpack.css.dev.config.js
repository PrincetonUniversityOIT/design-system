const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    // mode: 'development',

    entry: {
        styles: './src/scss/styles.scss',
        fonts: './src/scss/fonts.scss',
        design_system: './src/design_system.ts'
    },

    output: {
        path: path.resolve(__dirname, 'dist')
        // ,
        // filename: 'js/editor.blocks.js',
    },
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
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
                // test: /\.svg$/,
                // loader: 'svg-url-loader'
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
            // {
            //     test: /\.scss$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: { name: 'css/[name].css' }
            //         },
            //         { loader: 'extract-loader' },
            //         { loader: 'css-loader?-url' },
            //         { loader: 'postcss-loader' },
            //         { loader: 'sass-loader' }
            //     ]
            // }
        ]
    },

    plugins: [
        // new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new CopyPlugin({
            patterns: [
                // { from: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js', to: 'webcomponents-bundle.js' },
                { from: 'src/icons', to: 'icons' },
                { from: 'src/logos', to: 'logos' },
                { from: 'src/img', to: 'img' },
                // { from: 'src/fonts', to: 'fonts' },
            ],
        })
    ]
};
