const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const paths = require('../scripts/paths');
const packageJson = require('../package.json');

const { ModuleFederationPlugin } = webpack.container;

module.exports = {
  devtool: 'inline-source-map',
  entry: [paths.appIndexJs],
  mode: 'development',
  output: {
    publicPath: '/',
    path: paths.appBuild,
    filename: 'bundle.[hash].js',
    assetModuleFilename: 'assets/[name].[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react'],
          },
        },
      },
      {
        test: /\.css$/i,
        include: [paths.appSrc],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: paths.appPostCssConfig,
              },
            },
          },
        ],
      },
      {
        test: /\.(ico|gif|jpe?g|jpg|png|svg|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      Components: paths.resolveApp('src/components'),
      Containers: paths.resolveApp('src/container'),
      Utils: paths.resolveApp('src/utils'),
    },
  },
  plugins: [
    new Dotenv(),
    new webpack.ProgressPlugin(),
    new HtmlWebPackPlugin({
      template: paths.appHtml,
      favicon: paths.appFavicon,
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/ogzhanolguncu/react-typescript-module-federation
    // https://webpack.js.org/concepts/module-federation/
    new ModuleFederationPlugin({
      name: 'mfesbootstrap',
      filename: 'remoteEntry.js',
      exposes: {
        './GoogleBtn': './src/components/GoogleBtn/GoogleBtn.comp.tsx',
      },
      shared: packageJson.dependencies,
    }),
  ],
};
