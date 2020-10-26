const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const minifyCss = require('gulp-clean-css');
const htmlmin = require("gulp-htmlmin");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");

const jsPath = 'js/*.js';
const htmlPath = './*.html';
const cssPath = 'css/*.css';

// Complie scss into css
function style() {
  return gulp.src('./sass/**/*.scss')

    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())

    .pipe(gulp.dest('dist/sass'))

    .pipe(browserSync.stream())
}

// Minify JS
function jsTask() {
  return gulp.src(jsPath)
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
}

// Minify HTML
function htmlTask() {
  return gulp.src(htmlPath)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/html'));
}

// Minify CSS
function cssTask() {
  return gulp.src(cssPath)
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest('dist/css'));
}

function watch() {
  browserSync.init({
    server: {
      baseDir: ''
    }
  })

  gulp.watch('./sass/**/*.scss', style)
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.jsTask = jsTask;
exports.htmlTask = htmlTask;
exports.cssTask = cssTask;
exports.watch = watch;