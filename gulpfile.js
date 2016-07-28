(function() {
  
'use strict';

let browserSync = require('browser-sync').create();
let gulp        = require('gulp');
let modRewrite  = require('connect-modrewrite');

// Static server
gulp.task('browser-sync', function() {

  browserSync.init({
    server: {
        baseDir: "./src",
        middleware: [
          modRewrite([
            '!\\.\\w+$ /index.html [L]'
          ])
        ]
    }
  });

  gulp.watch("**/*.html").on("change", browserSync.reload);
  gulp.watch("**/*.js").on("change", browserSync.reload);
});

gulp.task('default', ['browser-sync']);

})();