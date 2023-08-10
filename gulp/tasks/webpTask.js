import webp from 'gulp-webp';
/* global app */
export const webpTask = () =>
  app.gulp.src('src/img/*.*').pipe(webp()).pipe(app.gulp.dest('dist/img'));
