var gulp = require('gulp'), // Main Gulp module
    concat = require('gulp-concat'), // Gulp File concatenation plugin
    open = require('gulp-open'), // Gulp browser opening plugin
    connect = require('gulp-connect'); // Gulp Web server runner plugin
    sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer');
    csso = require('gulp-csso');//minify css
    del = require('del');// del files
    htmlmin = require('gulp-htmlmin');
    uglify = require('gulp-uglify');
    runSequence = require('run-sequence');
// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];
// Configuration
var configuration = {
    paths: {
        src: {
            html: [
                './src/*.html',
                //'./src/home.html',
                //'./src/main.html',
            ],
            font:[
                // './src/font/webfonts/fa-regular-400.eot',
                // './src/font/webfonts/fa-regular-400.svg',
                // './src/font/webfonts/fa-regular-400.ttf',
                // './src/font/webfonts/fa-regular-400.woff',
                // './src/font/webfonts/fa-regular-400.woff2',
                './src/font/webfonts/*.{ttf,woff,eot,svg,woff2}'
            ],
            css: [
                './node_modules/bootstrap/dist/css/bootstrap.min.css',
                './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
                './node_modules/ui-select/dist/select.min.css',
            ],
            sassForWatch: './src/scss/*.scss',//==> this will have css double times
            sass: './src/scss/main.scss',
            js: [
                './node_modules/angular/angular.js',
                './node_modules/angular-animate/angular-animate.js',
                './node_modules/angular-route/angular-route.js',
                './node_modules/angular-ui-router/release/angular-ui-router.js',
                './node_modules/angular-sanitize/angular-sanitize.min.js',
                './node_modules/jquery/dist/jquery.js',
                './node_modules/underscore/underscore.js',                
                './node_modules/ui-select/dist/select.js',
                './node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
                './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
                './node_modules/moment/min/moment.js',
                './node_modules/bootstrap/dist/js/bootstrap.bundle.js',
                //'./node_modules/@fortawesome/fontawesome-free/js/all.js',
                // './src/index.js',
            ],
            ajs:[
                './src/index.js',
            ]

        },
        dist: './dist'
    },
    localServer: {
        port: 3434,
        url: 'http://localhost:3434/'
    }
};
// Clean output directory
gulp.task('clean', () => del(['dist']));
// Gulp task to minify all files
// gulp.task('default', ['clean'], function () {
//     runSequence(
//       'styles',
//       'scripts',
//       'pages'
//     );
//   });

// Gulp task to copy HTML files to output directory
gulp.task('html', function() {
    gulp.src(configuration.paths.src.html)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(configuration.paths.dist))
        .pipe(connect.reload());
});

// Gulp task to copy font files to output directory
gulp.task('font', function() {
    gulp.src(configuration.paths.src.font)
        .pipe(gulp.dest(configuration.paths.dist + '/static/webfonts'))
        .pipe(connect.reload());
});

// Gulp task to concatenate our css files
gulp.task('css', function () {
   gulp.src(configuration.paths.src.css)
       .pipe(concat('site.css'))
       .pipe(gulp.dest(configuration.paths.dist + '/static'))
       .pipe(connect.reload());
});

// Gulp task to concatenate our sass files
gulp.task('sass', function () {
    gulp.src(configuration.paths.src.sass)
        .pipe(concat('site.min.css'))
        .pipe(sass({
            noCache: true,
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.'],
            onError: console.error.bind(console, 'Sass error:')
        }))
        // Auto-prefix css styles for cross browser compatibility
        .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        // Minify the file
        .pipe(csso())
        // Output
        .pipe(gulp.dest(configuration.paths.dist + '/static'))
        .pipe(connect.reload());
 });

// Gulp task to concatenate our js files
gulp.task('js', function () {
    gulp.src(configuration.paths.src.js)
        .pipe(concat('site.min.js'))
        .pipe(gulp.dest(configuration.paths.dist + '/js'))
        .pipe(connect.reload());
 });
 // Gulp task to concatenate our js files
gulp.task('appjs', function () {
    gulp.src(configuration.paths.src.ajs)
        .pipe(concat('site.js'))
        .pipe(gulp.dest(configuration.paths.dist + '/js'))
        .pipe(connect.reload());
 });

// Gulp task to create a web server
gulp.task('connect', function () {
    connect.server({
        root: 'dist',
        port: configuration.localServer.port,
        livereload: true
    });
});

// Gulp task to open the default web browser
gulp.task('open', function(){
    gulp.src('dist/index.html')
        .pipe(open({uri: configuration.localServer.url}));
});

// Watch the file system and reload the website automatically
gulp.task('watch', function () {
    gulp.watch(configuration.paths.src.html, ['html']);
    gulp.watch(configuration.paths.src.css, ['css']);
    gulp.watch(configuration.paths.src.sassForWatch, ['sass']);
    gulp.watch(configuration.paths.src.js, ['js']);
    gulp.watch(configuration.paths.src.ajs, ['appjs']);
});

// Gulp default task
gulp.task('default', ['html', 'font','css', 'sass', 'js','appjs','connect', 'open', 'watch']);
//gulp.task('default', ['html', 'css', 'connect', 'open']);
//gulp.task('default', ['html', 'css', 'sass']);