var gulp = require('gulp'),
    bump = require('gulp-bump'),
    changed = require('gulp-changed'),
    concat = require('gulp-concat'),
    debug = require('gulp-debug'),
    ecstatic = require('ecstatic'),
    fs = require('fs'),
    gutil = require('gulp-util'),
    header = require('gulp-header'),
    html2js = require('gulp-html2js'),
    http = require('http'),
    inject = require("gulp-inject"),
    jshint = require('gulp-jshint'),
    // livereload = require('gulp-livereload'),
    merge = require('merge-stream'),
    ngAnnotate = require('gulp-ng-annotate'),
    pkg = require('./package.json'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    streamqueue = require('streamqueue'),
    replace = require('gulp-replace'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    runSequence = require('run-sequence'),
    clean = require('gulp-clean'),
    karma = require('karma'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if'),
    // load our config, build.CONFIG.js
    CONFIG = require('./build.CONFIG.js');

var internalConfig = {
  appCssName: 'app-' + pkg.version + '.css',
  appJsName: 'app-' + pkg.version + '.js',
  vendorName: 'vendor-' + pkg.version,
  baseName: 'app-' + pkg.version
};

// read environment from NODE_ENV variable
// in future it should be also possible to read from process argument --env
var env = process.env.NODE_ENV || 'dev';
var isDev = env === 'dev';
var isLocal = false;
var envConfigPath = 'config/env-' + env + '.js';

var appVersion = null;
var now = new Date();

if (env === 'dev' || env === 'test') {
  appVersion = now.toString();
} else {
  appVersion = now.getMonth() + 1 + '' + now.getDate();
}

appVersion = env + '.' + appVersion;
appVersion = appVersion.toUpperCase();

console.log('Config used: ' + envConfigPath);

gulp.task('js', function(done) {
  if (isLocal) {
    done();
    return;
  }
  return gulp.src(CONFIG.app_files.js)
    .pipe(gulpif(isDev, sourcemaps.init({ loadMaps: true })))
    .pipe(concat(internalConfig.baseName + '.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulpif(isDev, sourcemaps.write('./')))
    .pipe(gulp.dest(CONFIG.build_dir));
});

gulp.task('sass', function() {
  return gulp.src(CONFIG.app_files.scss)
    .pipe(gulpif(isDev, sourcemaps.init()))
    .pipe(sass({
      noCache: true
    }))
    .on('error', function(err) {
      console.log(err.message);
      this.emit('end');
    })
    .pipe(rename(function(path) {
      path.basename = internalConfig.baseName;
    }))
    .pipe(gulpif(isDev, sourcemaps.write('./')))
    .pipe(gulp.dest(CONFIG.build_dir + '/assets'));
});

gulp.task('copy', function() {
  var sources = [];
  sources.push(
    gulp.src('src/assets/**/*', {
      base: 'src/assets/'
    })
      .pipe(changed(CONFIG.build_dir + '/assets'))
      .pipe(gulp.dest(CONFIG.build_dir + '/assets'))
  );

  sources.push(
    gulp.src(envConfigPath)
      .pipe(replace(/%APP_VERSION%/g, appVersion))
      .pipe(changed(CONFIG.build_dir + '/config'))
      .pipe(gulp.dest(CONFIG.build_dir + '/config'))
  );

  if (isLocal) {
    sources.push(
      gulp.src(CONFIG.app_files.js)
        .pipe(changed(CONFIG.build_dir + '/src'))
        .pipe(gulp.dest(CONFIG.build_dir + '/src'))
    );
  }

  sources.push(
    gulp.src(CONFIG.vendor_files.js_separate, { base: '.' })
      .pipe(changed(CONFIG.build_dir))
      .pipe(gulp.dest(CONFIG.build_dir))
  );

  sources.push(
    gulp.src('config/maintenanceinfo.json')
      .pipe(changed(CONFIG.build_dir + '/config'))
      .pipe(gulp.dest(CONFIG.build_dir + '/config'))
  );

  sources.push(
    gulp.src('src/web.config')
      .pipe(changed(CONFIG.build_dir))
      .pipe(gulp.dest(CONFIG.build_dir))
  );
    return merge(sources);
});

gulp.task('vendor', function(done) {
  return merge([
    gulp.src(CONFIG.vendor_files.js)
    .pipe(concat(internalConfig.vendorName + '.js'))
    .pipe(gulp.dest(CONFIG.build_dir)),

    gulp.src(CONFIG.vendor_files.css)
    .pipe(concat(internalConfig.vendorName + '.css'))
    .pipe(gulp.dest(CONFIG.build_dir + '/assets'))
  ]);
});

///unused task start///
gulp.task('bundle', ['bundlejs', 'bundlecss', 'copydist'], function() {
    var target = gulp.src('./build/index.html'),
        files = [].concat(
            CONFIG.vendor_files.css,
            'assets/' + internalConfig.appCssName,
            'js/' + internalConfig.appJsName
        ),
        sources = gulp.src(files, {
            read: false,
            cwd: CONFIG.prod_dir
        });

    return target.pipe(inject(sources))
                 .pipe(gulp.dest(CONFIG.prod_dir));
});

gulp.task('bundlejs', function() {
  var paths = {
      scriptsNoTest: [envConfigPath, 'src/**/*.js', '!src/**/*.spec.js'],
      templates: 'build/templates-app.js'
  };

  //Concat into prod/js/app.js
  return streamqueue({
              objectMode: true
          },
          gulp.src(CONFIG.vendor_files.js),
          gulp.src(paths.scriptsNoTest),
          gulp.src(paths.templates)
      )
      .pipe(concat(internalConfig.appJsName))
      .pipe(ngAnnotate())
      .pipe(uglify())
      .pipe(gulp.dest(CONFIG.prod_dir + '/js'));
});

gulp.task('bundlecss', function() {
  var paths = [
    'build/assets/**/*.css'
  ].concat(CONFIG.vendor_files.css);

  return gulp.src(paths)
              .pipe(concat(internalConfig.appCssName))
              .pipe(gulp.dest(CONFIG.prod_dir + '/assets'));
});

gulp.task('copydist', function() {
  //Copy assets

  var paths = {
      assets: ['build/assets/**/*', '!build/assets/**/*.css']
  };

  return gulp.src(paths.assets)
            .pipe(gulp.dest(CONFIG.prod_dir + '/assets'));
});
///unused task end///

gulp.task('jshint', function() {
    return gulp.src(CONFIG.app_files.js)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('html2js', function() {
    var templates = [{
        files: CONFIG.app_files.atpl,
        type: 'app'
    }, {
        files: CONFIG.app_files.ctpl,
        type: 'common'
    }];

    return templates.map(function(template) {
        return gulp.src(template.files)
            .pipe(html2js({
                base: 'src/' + template.type,
                outputModuleName: 'templates-' + template.type
            }))
            .pipe(changed(CONFIG.build_dir, {
                extension: '.js'
            }))
            .pipe(concat('templates-' + template.type + '.js'))
            .pipe(gulp.dest(CONFIG.build_dir));
    });
});

var indexTask = function() {
  var target = gulp.src('src/index.html');

  var files = [].concat(
    internalConfig.vendorName + '.js',
    CONFIG.vendor_files.js_separate,
    envConfigPath,
    isLocal ? 'src/**/*.js' : [],
    isLocal ? [] : internalConfig.baseName + '.js',
    'templates-common.js',
    'templates-app.js',
    'assets/' + internalConfig.vendorName + '.css',
    'assets/' + internalConfig.baseName + '.css'
  );

  var sources = gulp.src(files, {
    read: false,
    cwd: CONFIG.build_dir,
    addRootSlash: false
  });

  var versionString = parseInt(new Date() - 0).toString();

  return target.pipe(inject(sources, {
    addSuffix: '?version=' + versionString
  }))
    .pipe(gulp.dest(CONFIG.build_dir));
};

gulp.task('index', ['sass', 'js', 'vendor', 'copy', 'html2js'], function() {
  return indexTask();
});

gulp.task('watch-index', function() {
  return indexTask();
});

// gulp.task('livereload', function() {
//     livereload.listen();
//     gulp.watch(CONFIG.build_dir + '/**').on('change', livereload.changed);
// });

gulp.task('watch', function() {
    isLocal = true;
    runSequence('build', 'server');
    gulp.watch(['src/**/*.scss'], ['sass']);
    gulp.watch(['src/**/*.js'], [
        'jshint',
        'test',
        'copy'
    ]);
    gulp.watch([CONFIG.app_files.atpl, CONFIG.app_files.ctpl], ['html2js']);
    gulp.watch('src/index.html', ['watch-index']);
});

gulp.task('server', function() {
    http.createServer(ecstatic({
        root: __dirname + '/build',
        cache: 0
    })).listen(8080);
    gutil.log(gutil.colors.blue('HTTP server listening on port 8080'));
});

gulp.task('test', function(done) {
  new karma.Server({
    configFile: __dirname + '/karma/karma-unit.tpl.js',
    singleRun: true
  }, function() {
    done();
  }).start();
});

gulp.task('clean', function() {
  return gulp.src(['dist', 'build'], {read: false})
              .pipe(clean());
});

gulp.task('build', function(done) {
  runSequence('clean',
              'jshint',
              'test',
              'index',
              done);
});

gulp.task('dist', function(done) {
  runSequence('build',
              'bundle',
              done);
});

gulp.task('default', ['build']);
