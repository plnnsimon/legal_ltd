var webpack = require('webpack');
const dotenv = require('dotenv').config({ path: '.env' });

module.exports = {
  entry: './public/app.js',
  mode: 'development',
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed)
    })
  ].filter(Boolean)
};
