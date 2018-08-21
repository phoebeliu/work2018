// Add our dependencies
var gulp = require('gulp'), // Main Gulp module
    concat = require('gulp-concat'), // Gulp File concatenation plugin
    connect = require('gulp-connect'); // Gulp Web server runner plugin

// Configuration
var configuration = {
    paths: {
        src: {
            html: 'index.html',
            js: 'index.js',
            css: [
                './css/bootstrap.min.css',
                './css/index.css',
            ]
        }
    },
    localServer: {
        port: 3434,
        url: 'http://localhost:3434/'
    }
};

gulp.task('html', function() {
    gulp.src(configuration.paths.src.html)
        .pipe(connect.reload());
});

gulp.task('js', function() {
  gulp.src(configuration.paths.src.js)
      .pipe(connect.reload());
});

gulp.task('css', function () {
   gulp.src(configuration.paths.src.css)
       .pipe(connect.reload());
});

// Gulp task to create a web server
gulp.task('connect', function () {
    connect.server({
        port: configuration.localServer.port,
        livereload: true
    });
});

// Watch the file system and reload the website automatically
gulp.task('watch', function () {
    gulp.watch(configuration.paths.src.html, ['html']);
    gulp.watch(configuration.paths.src.css, ['css']);
    gulp.watch(configuration.paths.src.js, ['js']);
});

// Gulp default task
gulp.task('default', ['connect', 'watch']);

