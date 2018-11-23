const webpack = require('webpack');
const path = require('path');

module.exports = env => {
  const production = !!(env && env.NODE_ENV && env.NODE_ENV === 'production');

  const plugins = [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('client')
      }
    }),
    ...(production ? [] : [new webpack.HotModuleReplacementPlugin()])
  ];

  const entry = [
    ...(production
      ? []
      : [
          'react-hot-loader/patch',
          'webpack-dev-server/client?http://localhost:4001',
          'webpack/hot/only-dev-server'
        ]),
    './client/index'
  ];

  return {
    devtool: 'inline-source-map',
    entry,
    mode: production ? 'production' : 'development',
    target: 'web',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          include: [
            path.join(__dirname, 'client'),
            path.join(__dirname, 'common')
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins,
    devServer: {
      host: 'localhost',
      port: 4001,
      historyApiFallback: true,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    output: {
      path: path.join(__dirname, '.build'),
      publicPath: 'http://localhost:4001/',
      filename: 'client.js'
    }
  };
};
