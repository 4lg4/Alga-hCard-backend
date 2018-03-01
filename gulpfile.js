/**
 * Created by www.Alga.me on 1/3/18.
 */

const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', [
  'compile',
  'copy-frontend',
  'copy'
]);

gulp.task('compile', function(cb) {
  gulp.src(['./src/**/*.js','!./src/node_modules/**/*'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/'));

  cb();
});

gulp.task('copy-frontend', function(cb) {
  gulp.src(['./src/frontend/**/*'])
    .pipe(gulp.dest('./dist/frontend'));

  cb();
});

gulp.task('copy', function(cb) {
  gulp.src(['./package.json','./src/env.json'])
    .pipe(gulp.dest('./dist/'));

  cb();
});
