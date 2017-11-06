const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['./src/main.js','./src/main.css'],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract('css-loader!postcss-loader'),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'./assets/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      "node_modules"
    ]
  },
  devServer: {
    contentBase: './dist',
    inline: true,
    port: 8080,
    historyApiFallback: true,
    stats: {
      version: false,
      hash: false,
      chunkModules: false,
    },
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css'
    }),
  ],
  devtool: 'source-map',
};
