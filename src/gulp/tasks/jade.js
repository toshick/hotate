const p = require('./params.json')
const path = require('path')
const gulp = require('gulp')
const rename = require('gulp-rename') 
const jade = require('gulp-jade')
const jadepath = '../jade'

//var jadedata = require(path.resolve(path.join(__dirname, '../../jade/jadeparams.json')))
const jadedata = require('../../jade/jadeparams.json')

/*-----------------------*/
// jade
/*-----------------------*/
gulp.task('jade', function() {

  return gulp.src(jadepath + '/**/!(_)*.jade')
    .pipe(jade({
      pretty: true,
      data: jadedata,
      basedir: jadepath,
      //client: true,
      
    }))
    //拡張子変えたい場合はココ
    // .pipe(rename({
    //   extname: '.xxx'
    // }))
    .pipe(gulp.dest(p.path_htdocs))
})
