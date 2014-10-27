var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var shell = require('gulp-shell');

var appOptions = {

  /*
   * DIRECTORIES
   */

  // Where your app lives
  appDir: './app',

  // Where your production version is deployed
  distDir: './dist',

  // Where you bundled development version will run from
  buildDir: './build',

  /*
   * BUNDLE FILES
   */

  // The name of your main app file
  entryFile: 'main.js',

  // The name of your bundled vendors
  vendorsFile: 'vendors.js',

  /*
   * VENDORS
   */

  // Add other vendors here, if any
  vendors: [
    'react',
    'flux-react'
  ]

};

// The task that handles both development and deployment
var browserifyTask = function (bundleOptions) {

  // This bundle only runs when you start to develop,
  // it is needed to prevent rebundling external deps
  // on project changes
  var vendorBundler = browserify({
    debug: bundleOptions.debug,
    require: appOptions.vendors
  });

  // This bundle is for the application
  var appBundler = browserify({
    entries: [appOptions.appDir + '/' + appOptions.entryFile],
    debug: bundleOptions.debug,

    // These options are needed by Watchify
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  // Add reactify transformer
  appBundler.transform(reactify);

  // Add vendors as externals
  appOptions.vendors.forEach(function (vendor) {
    appBundler.external(vendor);
  });

  // The rebundle process
  var rebundle = function () {

    var start = Date.now();
    appBundler.bundle()
      .on('error', gutil.log)
      .pipe(source(appOptions.entryFile))
      .pipe(gulpif(bundleOptions.uglify, streamify(uglify())))
      .pipe(gulp.dest(bundleOptions.dest))
      .pipe(notify(function () {
        console.log('Built in ' + (Date.now() - start) + 'ms');
      }));

  };

  // Fire up Watchify when developing
  if (bundleOptions.watch) {
    appBundler = watchify(appBundler);
    appBundler.on('update', rebundle);
  }

  // Run the vendor bundle when the default Gulp task starts
  vendorBundler.bundle()
    .on('error', gutil.log)
    .pipe(source(appOptions.vendorsFile))
    .pipe(gulpif(bundleOptions.uglify, streamify(uglify())))
    .pipe(gulp.dest(bundleOptions.dest));

  return rebundle();

};

gulp.task('default', function () {

  browserifyTask({
    watch: true,
    dest: appOptions.buildDir,
    uglify: false,
    debug: true
  });

});

gulp.task('deploy', function () {

  browserifyTask({
    watch: false,
    dest: appOptions.distDir,
    uglify: true,
    debug: false
  });

});