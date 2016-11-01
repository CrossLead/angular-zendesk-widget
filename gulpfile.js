var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var path = require('path');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var eslint = require('gulp-eslint');

/**
 * File patterns
 **/

// Root directory
var rootDirectory = path.resolve('./');

// Source directory for build process
var sourceDirectory = path.join(rootDirectory, './src');

var sourceFiles = [
  // Load angular module files first
  path.join(sourceDirectory, '/**/*.module.js'),

  // Next, add all angular services and providers
  path.join(sourceDirectory, '/**/*.service.js'),

  // Then the angular run files last
  path.join(sourceDirectory, '/**/*.run.js'),

  // Include UMD definition for compatability
  path.join(sourceDirectory, '**/*.umd.js')
];

var lintFiles = [
  'gulpfile.js',
  // Karma configuration
  'karma-*.conf.js'
].concat(sourceFiles);

gulp.task('build', function() {
  gulp.src(sourceFiles)
    .pipe(plumber())
    .pipe(concat('angular-zendesk-widget.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('angular-zendesk-widget.min.js'))
    .pipe(gulp.dest('./dist'));
});

/**
 * Process
 */
gulp.task('process-all', function (done) {
  runSequence('lint', 'test-src', 'build', 'test-dist-concatenated', 'test-dist-minified', done);
});

/**
 * Watch task
 */
gulp.task('watch', function () {

  // Watch JavaScript files
  gulp.watch(sourceFiles, ['process-all']);
});

/**
 * Validate source JavaScript
 */
gulp.task('lint', function () {
  return gulp.src(lintFiles)
    .pipe(plumber())
    .pipe(eslint({
      extends: 'eslint:recommended',
      globals: {
        angular: true,
        module: true,
        require: true,
        __dirname: true,
        document: true,
        process: true,
        define: true
      }
    }))
    // Outputs the results to the console
    .pipe(eslint.format())
    // Exits the process with exit-code(1) if there were errors
    .pipe(eslint.failAfterError());
});

/**
 * Run test once and exit
 */
gulp.task('test-src', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done);
});

gulp.task('default', function () {
  runSequence('process-all', 'watch');
});
