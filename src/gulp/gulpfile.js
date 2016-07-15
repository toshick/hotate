'use strict'

// gulpfile.js
const fs = require('fs')
const p = require('./tasks/params.json')

const gulp = require('gulp')
const replace = require('gulp-replace')
const path_srcjs = p.path_srcjs
const browserSync = require('browser-sync').create()
  // const sass = require('gulp-sass')
const compass = require('gulp-compass')
const cssnext = require('gulp-cssnext')
const plumber = require('gulp-plumber')
const rsync = require('gulp-rsync');

//外部タスクをロード
const requireDir = require('require-dir')
requireDir('./tasks', { recurse: true })

// Replace HostName.
gulp.task('xxx', function() {
  console.log('xxxです')
})

// Replace HostName.
gulp.task('fo', function() {
  return gulp
    .src(['../BlaboSample/**/*.swift'], { base: './' })
    .pipe(replace(/\n*[\s]*?\n/g, '\n'))
    .pipe(replace(/}\n/g, '}\n\n'))
    .pipe(replace(/\n(class.+?){/g, '\n$1{\n'))
    .pipe(replace(/(\n\s+\/\*[\s\S]+デイニシャライザ)/g, '\n$1'))
    .pipe(replace(/\n\s*\*/g, '\n    *'))
    .pipe(gulp.dest('./'))
})

/*-----------------------*/
// deploy
/*-----------------------*/
gulp.task('dep', function() {

  return gulp
    .src(p.path_htdocs + '/**')
    .pipe(rsync({
      root: p.path_htdocs + '/',
      hostname: 'toshick.com',
      destination: '/ebs/www/html/',
      // archive: true,
      // silent: false,
      // compress: true
    }))
})

/*-----------------------*/
// 監視
/*-----------------------*/
gulp.task('w', function() {
  // gulp.watch('./testfiles/**/*.swift', ['nyao'])

  /*-----------------------*/
  // browserSync
  /*-----------------------*/
  browserSync.init({
    //変更
    proxy: 'localhost:3007/',
    open: false,
    notify: false,
    reloadDelay: 100,
    startPath: '/hotate/',
    injectChanges: true
  })

  var watcher

  /*-----------------------*/
  // 出力ファイルの変更検知・リロード
  /*-----------------------*/
  watcher = gulp.watch([p.path_htdocs + '/**/*.js', p.path_htdocs + '/**/*.html', p.path_htdocs + '/**/*.css'])
  watcher.on('change', browserSync.reload)

  /*-----------------------*/
  // jade
  /*-----------------------*/
  watcher = gulp.watch([p.path_jade + '/**/*.jade'])
  watcher.on('change', function(evt) {
    // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
    var tasks = ['jade']
      // let path = evt.path

    // if (path.indexOf('/home/') != -1) {
    //   tasks.push('webpack.home')
    // }

    gulp.start(tasks)

  })

  /*-----------------------*/
  // srcjs
  /*-----------------------*/
  watcher = gulp.watch([path_srcjs + '/**/*.js'])
  watcher.on('change', function(evt) {
    // console.log('File ' + event.path + ' was ' + event.type + ', running tasks...')
    var tasks = []
    let path = evt.path

    if (path.indexOf('/hotate/') != -1) {
      tasks.push('webpack.hotate')
    }

    gulp.start(tasks)

  })

  /*-----------------------*/
  // scss
  /*-----------------------*/
  watcher = gulp.watch([p.path_scss + '/**/*.scss'])
  watcher.on('change', function(evt) {

    let path = evt.path
    console.log('scss変更あり', path)

    gulp.src(p.path_scss + '/**/*.scss')
      // gulp.src(path)
      .pipe(plumber(function() {
        return this.emit('end')
      }))
      // .pipe(sass({
      //   includePaths:p.path_scss,
      //   outputStyle: 'compressed'
      // }))

    .pipe(compass({
      project: fs.realpathSync(__dirname + '/../compass'),
      css: p.path_htdocs,
    }))

    .on('error', function(err) {
        console.log(err.message)
      })
      .pipe(cssnext())
      .pipe(gulp.dest(p.path_htdocs))

  })

})
