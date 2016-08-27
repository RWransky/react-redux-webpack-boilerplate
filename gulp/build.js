var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    runSequence = require('run-sequence'),
    del         = require('del'),
    webpack     = require('webpack');

module.exports = function(ENV) {
  var WEBPACK_CONFIG = require('../webpack.config.js')(ENV, {
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      })
      //new webpack.optimize.UglifyJsPlugin({
        //mangle: true,
        //compress: true,
        //preserveComments: false,
        //screwIE8: true
      //})
    ]
  });
  var BUILD_DIR = WEBPACK_CONFIG.BUILD_DIR;

  gulp.task('build', function(callback) {
    runSequence(
      'build.clean',
      'build.webpack',
      callback
    );
  });

  gulp.task('build.clean', function(callback) {
    del([BUILD_DIR], { force: true }, callback);
  });

  gulp.task('build.webpack', function(callback) {
    webpack(WEBPACK_CONFIG, function(err, stats) {
      if (err) {
        throw new gutil.PluginError('build.webpack', err);
      }

      gutil.log('[build.webpack]', stats.toString({
        colors: true
      }));
      callback();
    });
  });
};
