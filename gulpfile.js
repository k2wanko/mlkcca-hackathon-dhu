var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync  = require('browser-sync');

gulp.task('build', function(){});

gulp.task('reload', function(){
  browserSync.reload()
});

gulp.task('watch', function(){
  browserSync({
    notify: false,
    logPrefix: "@",
    server: ["./"]
  });
});
