import webpInHtml from 'gulp-webp-in-html';
/* global app */
export const convert = () =>
  app.gulp
    .src('src/html/*/*.html')
    .pipe(webpInHtml())
    .pipe(app.gulp.dest('output/'));
