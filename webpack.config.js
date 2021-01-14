const path = require('path')

module.exports = {
  mode: 'development',
  watch: true,
  devtool: 'eval-cheap-module-source-map', // source map feature
  entry: './src/index.js',
  output: {
    filename: 'application.js',
    path: path.resolve(__dirname, 'build')
  },
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
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
