var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    webpack     = require('webpack'),
    webserver   = require('gulp-webserver'),
    runSequence = require('run-sequence');

module.exports = function(ENV) {
  var WEBPACK_CONFIG = require('../webpack.config.js')(ENV, {
    jsBundleName: 'bundle.js',
    cssBundleName: 'bundle.css'
  });
  var DEV_PORT       = 3000;
  var BUILD_DIR      = WEBPACK_CONFIG.BUILD_DIR;

  WEBPACK_CONFIG.watch = true;

  /**
   * 1. Builds js and css
   * 2. Watches for changes in /src to build js and css
   * 3. Starts local node server to serve frontend assets
   */
  gulp.task('dev', function(callback) {
    runSequence(
      'dev.webpack',
      'dev.serve',
      callback
    );
  });

  /**
   * Serve our files from /build
   */
  gulp.task('dev.serve', function() {
    gulp.src([BUILD_DIR])
      .pipe(webserver({
        port: DEV_PORT,
        fallback: 'index.html'
      }));
  });

  gulp.task('dev.webpack', function() {
    webpack(WEBPACK_CONFIG, function(err, stats) {
      if (err) {
        throw new gutil.PluginError('dev.webpack', err);
      }

      gutil.log('[dev.webpack]', stats.toString({
        colors: true
      }));
    });
  });
};
