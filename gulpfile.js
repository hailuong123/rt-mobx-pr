var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  gulp.src('src/assets/sass/index.scss')
      .pipe(sass({style: 'compresse'}))
      .on('error', gutil.log)
      .pipe(gulp.dest('assets'));
});

gulp.task('watch', ['sass'], function() {
  gulp.watch('src/assets/elements/*.scss', ['styles']); //watch ALL the SCSS files
});