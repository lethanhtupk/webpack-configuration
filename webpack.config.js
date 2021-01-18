const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  watch: true,
  devtool: 'eval-cheap-module-source-map', // source map feature
  entry: './src/index.js',
  output: {
    filename: 'application.js',
    path: path.resolve(__dirname, 'build')
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'application.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules | bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({
                    overrideBrowserslist: ['last 3 versions', 'ie>9']
                  })
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({
                    overrideBrowserslist: ['last 3 versions', 'ie>9']
                  })
                ]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8129, // if any images with size less or equal 8192 bytes
              // encode them as base64 and inject the result to css file.
              name: '[name].[hash:7].[ext]',
              publicPath: './'
            }
          }
        ]
      }
    ]
  }
}
