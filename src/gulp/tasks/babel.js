const p = require('./params.json')
const path = require('path')
const gulp = require('gulp')
const babel = require('gulp-babel')

var path_htdocs = p.path_htdocs

/*-----------------------*/
// babel
/*-----------------------*/
gulp.task('babel', function() {

  return gulp.src(path_htdocs+'/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(path_htdocs))
})
