const p = require('./params.json')
const path = require('path')
const gulp = require('gulp')
const webpack = require('gulp-webpack')

const path_srcjs = __dirname + '/../src_js'
const path_public = __dirname + '/../../../htdocs'

/*-----------------------*/
// ページ指定してコンフィグを取得
/*-----------------------*/
function getConfig(param) {

  var config = require('./config.js').webpack
  for (var item in param) {
    config[item] = param[item]
  }
  return config
}

/*-----------------------*/
// webpack.hotate
/*-----------------------*/
gulp.task('webpack.hotate', function() {

  /*-----------------------*/
  // 入出力をセット
  /*-----------------------*/
  var config = getConfig({
    entry: path_srcjs + '/hotate/_init.js',
    output: {
      path: path_public + '/hotate/js/',
      filename: 'hotate.min.js',
    },
  })

  return gulp.src(config.entry)
    .pipe(webpack(config))
    .pipe(gulp.dest(config.output.path))
})


