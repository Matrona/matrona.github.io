const { watch, series, parallel, src, dest, gulp } = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const browsersync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
var ghPages = require('gulp-gh-pages');

function clean_app(cb) {
  src('./app', { allowEmpty: true }, {
      read: false
    })
    .pipe(clean());
  cb();
}

function clean_build(cb) {
  src('./build', { allowEmpty: true }, {
      read: false
    })
    .pipe(clean());
  cb();
}

function styles(cb) {
  src('./src/styles/application.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(dest('./app/css'))
    .pipe(browsersync.stream());
  cb();
}

function styles_build(cb) {
  src('./src/styles/application.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(dest('./build/css'));
  cb();
}

function scripts(cb) {
  src('./src/scripts/**/*.js')
    .pipe(dest('./app/js'))
    .pipe(browsersync.stream());
  cb();
}

function scripts_build(cb) {
  src('./src/scripts/**/*.js')
    .pipe(uglify())
    .pipe(dest('./build/js'));
  cb();
}

function images(cb) {
  src('./src/images/**/*')
    .pipe(dest('./app/img'))
    .pipe(browsersync.stream());
  cb();
}

function images_build(cb) {
  src('./src/images/**/*')
    .pipe(imagemin())
    .pipe(dest('./build/img'));
  cb();
}

function views(cb) {
  src('./src/views/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('./app'))
    .pipe(browsersync.stream());
  cb();
}

function views_build(cb) {
  src('./src/views/**/*.pug')
    .pipe(pug({
      pretty: false
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest('./build'));
  cb();
}

function public(cb) {
  src('./src/public/**/*')
    .pipe(dest('./app'))
    .pipe(browsersync.stream());
  cb();
}

function public_build(cb) {
  src('./src/public/**/*')
    .pipe(dest('./build'));
  cb();
}

function server(cb) {
  browsersync.init({
    server: {
      baseDir: './app'
    }
  });

  watch('./src/styles/**/*.scss', styles);
  watch('./src/scripts/**/*.js', scripts);
  watch('./src/images/**/*', images);
  watch('./src/views/**/*.pug', views);
  watch('./src/public/**/*', public);

  watch('./app/*.html').on('change', browsersync.reload);
  cb();
}

function deploy(cb) {
  src('./build/**/*')
    .pipe(ghPages());
  cb();
}

exports.clean = parallel(clean_app, clean_build);
exports.build = series(public_build, parallel(styles_build, scripts_build, images_build), views_build);
exports.default = series(public, parallel(styles, scripts, images), views, server);
exports.deploy = series(deploy);
