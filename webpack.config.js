const path = require('path');
const webpack = require('webpack');

const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SassLintPlugin = require('sasslint-webpack-plugin');

module.exports = {
  // Options for webpack-dev-server --->
  devServer: {
    historyApiFallback: true,
    host: '127.0.0.1',
    inline: true,
    port: 9557,
    proxy: {
      '/': {
        target: 'http://localhost:3000/'
      }
    }
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  entry: {
    main: './src/_client/App.tsx',
    polyfills: './src/_client/Polyfills.ts',
  },
  output: {
    path: path.join(__dirname, 'app'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js',
  },
  module: {
    loaders: [
      { test: /\.html/, loader: 'raw-loader' },
      {
        test: /\.jpg$|\.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'resources/'
            }
          }
        ]
      },
      { test: /\.ts$/, loader: 'awesome-typescript-loader?configFileName=./tsconfig.json!tslint-loader?configFile=tslint.json' },
      { test: /\.tsx$/, loader: 'awesome-typescript-loader?configFileName=./tsconfig.json!tslint-loader?configFile=tslint.json' },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.scss$|\.sass$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]', // Do we really need CSS_MODULES?
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'bulma-loader',
            options: {
              theme: 'src/_client/_bulma.sass'
            }
          }
        ]
      },
      { test: /\.woff2$|\.ttf$|\.eot$|\.svg$/, loader: 'url-loader' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    plugins: [
      new TsConfigPathsPlugin({
        configFileName: 'tsconfig.json'
      })
    ],
    alias: {
      'index.html': 'src/_client/index.html'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/_client/index.development.html'
    }),
    new SassLintPlugin({
      glob: 'src/_client/**/*.scss',
      ignoreFiles: [
        'src/client/_common/materialize.scss'
      ]
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['commons', 'polyfills'],
      filename: 'commons.js',
    }),
  ],
  stats: {
    chunks: false
  }
};
