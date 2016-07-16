const p = require('./params.json')
var webpack = require('webpack')
var src_js = __dirname +'/../src_js/'

var lib = src_js + 'lib/'
var components = src_js + 'components/'
var common = src_js + 'common/'
var path_srcjs = p.path_srcjs
var path_public = __dirname +'/../../../htdocs'

module.exports = {

  /*-----------------------*/
  // webpack
  /*-----------------------*/
  webpack: {
    // entry: src + '/' + fileName,
    // output: {
    //   filename: '[name].js'
    // },
    resolve: {
      extensions: ['', '.js'],
      modulesDirectories: ['node_modules', 'bower_components'],
      alias: {
        jquery: lib + 'jquery-2.1.0.min.js',
        // 'pixi': lib + 'pixi.min.js',
        // 'pixi-spine': lib + 'pixi-spine.min.js',
        'jquery-cookie': lib + 'jquery.cookie.js',
        'jquery-indicator': lib + 'jquery.activity-indicator-1.0.0.js',
        'jquery-lazyload': lib + 'jquery.lazyload.js',
        'bootstrap': common + 'bootstrap.min.js',

        'components': components + '_component.js',
        'overlay': components + '_compo-overlay.js',
        'mixin-overlay': common + '_mixin-overlay.js',

        //common
        'util': common + '_util.js',
        'mixin': common + '_mixin.js',
        'mixin_init': common + '_mixin_init.js',
        'overridebuiltin': common + '_overridebuiltin.js',
        'mytween': common + '_mytween.js',
        'mm': common + '_model.js',
        'notice': common + '_notice.js',

        'scrollfadein': common + '_scrollfadein.js',
      }
    },
    plugins: [
      // new webpack.ResolverPlugin(
      //   //new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      // ),
      new webpack.optimize.DedupePlugin(), // ライブラリ間で依存しているモジュールが重複している場合、二重に読み込まないようにする
      new webpack.optimize.AggressiveMergingPlugin(), //ファイルを細かく分析し、まとめられるところはできるだけまとめてコードを圧縮する
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
      })

    ],
    module: {
      // babel Loaderを指定してWebpackがBabelのコンパイルをできるように
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }]
    },

  }

}
