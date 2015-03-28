var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync  = require('browser-sync');
var reload = browserSync.relaod

gulp.task('build', function(){});

gulp.task('watch', function(){
  browserSync({
    notify: false,
    logPrefix: "@",
    server: ["./"]
  });

  gulp.watch(["./**/*.html"], ['build'], reload);
  gulp.watch(["./**/*.js"], ['build'], reload);
  gulp.watch(["./**/*.css"], reload);
});
