const
    extractTextWebpackPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    Path = require('./basePath');

const config = {
    entry: {
        main: [Path.input + '/js/index.js']
    },
    output: {
        path: Path.output,
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: extractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: [
                                            'Android >= 4',
                                            'Chrome >= 30',
                                            'iOS >= 6',
                                            'ie>=6',
                                            'Firefox >= 20',
                                            'Safari >= 5'
                                        ]
                                    })
                                ]
                            }
                        },
                        'sass-loader'
                    ],
                })
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            },
        ]
    }
}

module.exports = config