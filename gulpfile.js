var gulp = require('gulp');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var historyApiFallback = require('connect-history-api-fallback');
var proxyMiddleware = require('http-proxy-middleware');
var cleanCSS = require('gulp-clean-css');

gulp.task('js', function() {
  return gulp.src(['./public/app.js', './public/app-routes.js', './public/app/**/**.module.js', './public/app/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js', {newLine: ';'}))
    .pipe(babel({presets: ['es2015']}))
    .pipe(ngAnnotate({add: true}))
    .pipe(ngmin())
    .pipe(uglify({mangle: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/dist/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function () {
  return gulp.src('./public/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/dist'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function () {
  return gulp.src(['./public/*.html'])
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('serve', ['watch'], function() {
  var proxy = proxyMiddleware('/api', {target: 'http://127.0.0.1:8080'});
  browserSync.init({
    server: {
      baseDir:['./', './public']
    },
    middleware: [proxy, historyApiFallback()]
  });
});

gulp.task('watch', function () {
  gulp.watch(['./public/app.js', './public/app-routes.js', './public/app/**/**.module.js', './public/app/**/*.js'], ['js']);
  gulp.watch('./public/css/*.css', ['css']);
  gulp.watch(['./public/*.html', './public/**/*.html'], ['html']);
});

gulp.task('build', ['js', 'css']);

gulp.task('default', ['serve']);