var ENV = process.env.ENV || 'dev',
    gulp = require('gulp');
var spawnSync  = require('child_process').spawnSync;

require('./gulp/build')(ENV);
require('./gulp/dev')(ENV);

gulp.task('default', ['dev']);


gulp.task('lint', () => {
  /* taken from ureact-app: https://github.com/udacity/ureact-app/blob/master/src/gulp-tasks/lint.js */
  var result = spawnSync(
    'node_modules/.bin/eslint',
    ['--ext', '.js,.jsx', 'src', 'test'], {stdio: 'inherit'}
  );
  process.exit(result.status);
});
