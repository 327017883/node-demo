let path = require('path')
let webpack = require('webpack')

let glob = require('glob');

function getEntry(srcDir){

  let allJs = glob.sync(srcDir + '/*.js');

  let obj = {};
  let dir = __dirname.replace(/\\/g,'/') + '/vue/';

  allJs.forEach(function(src){

    obj['/pages/' + src.replace(/(\.js)|vue\//g, '')] = [ './' + src];
  });

  return obj;
}

module.exports = {
  entry: getEntry('vue/*'),
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/public/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
         test: /\.js$/,
         loader: 'babel-loader',
         exclude: /node_modules/
       },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  watch: true
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
