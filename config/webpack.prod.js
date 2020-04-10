const paths = require('./paths'),
  merge = require('webpack-merge'),
  common = require('./webpack.common.js'),
  imageminMozjpeg = require('imagemin-mozjpeg'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  ImageminPlugin = require('imagemin-webpack-plugin').default,
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries"),
  OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    path: paths.publicDir,
    publicPath: './',
    filename: `[name].js`,
    chunkFilename: `[name].js`,
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: `${paths.srcDir}/${paths.imagesFolder}`,
      to: `${paths.publicDir}/${paths.imagesFolder}`,
      // ignore: ['favicon.ico', 'favicon.png'],
    }]),
    new ImageminPlugin({
      pngquant: ({quality: '65-90'}),
      plugins: [
        imageminMozjpeg({
          quality: 50,
          progressive: true
        })
      ]
    }),
    new MiniCssExtractPlugin({
      filename: `[name].css`,
      chunkFilename: `[name].css`,
    }),
    new FixStyleOnlyEntriesPlugin(),
    new OptimizeCSSAssetsPlugin({})
  ],
  module: {
    rules: [
      {
        test: /\.(s?css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
})
