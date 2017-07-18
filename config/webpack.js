var webpack = require('webpack');
var path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

var paths = {
  root: ROOT_DIR,
  src: path.join(ROOT_DIR, 'src'),
  modules: path.join(ROOT_DIR, 'node_modules')
}

var index = {
  name: "index",
  cache: true,
  externals: [],
  entry: {
    index: path.join(paths.src, "index.ts")
  },
  output: {
    filename: "[name].js",
    path: ROOT_DIR,
    libraryTarget: "umd"
  },
  module: {
    loaders: [{
      test: /\.ts[x]?$/,
      loaders: ['ts-loader?' + JSON.stringify({
        entryFileIsJs: false
      })],
      exclude: paths.modules
    }, {
      test: /\.js[x]?$/,
      loaders: [
        'babel-loader'
      ],
      exclude: paths.modules
    }]
  },
  resolve: {
    extensions: [
      ".ts",
      ".js",
      ".yaml"
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: "var max = this;",
      raw: true
    })
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     screw_ie8: true
    //   }
    // })
  ]
};

module.exports = index;