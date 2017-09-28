var 
  browserSync = require('browser-sync').create(),
  autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  newer = require('gulp-newer'),
  args = require('yargs').argv,
  sass = require('gulp-sass'),
  gulpif = require('gulp-if'),
  size = require('gulp-size'),
  gulp = require('gulp');

var compressFlag = args.compress === true;

// -- Stream configuration
var config = {
  sass: {
    outputStyle: ''
  },
  imagemin: {
    progressive: true,
    optimizationLevel: 10
  }
};

var whichStyle = (function() {
  if (compressFlag) {
    config.sass.outputStyle = 'compressed';
  } else {
    config.sass.outputStyle = 'nested';
  }
})();

// -- File paths
var path = {
  src: {
    base: './assets/**',
    style: './assets/styles/**/*.scss',
    script: './assets/scripts/*.js',
    image: './assets/images/**/*.+(jpg|png|gif)'
  },
  dest: {
    base: './dist/**',
    style: './dist/styles',
    script: './dist/scripts',
    image: './dist/images'
  }
};

// -- Tasks
gulp.task('default', ['style', 'script', 'image']);

gulp.task('style', function () {
  return gulp.src(path.src.style)
    .pipe(sass(config.sass).on('error', sass.logError))
    .pipe(autoprefixer())
    // .pipe(gulpif(compressFlag, cssnano()))
    .pipe(gulp.dest(path.dest.style))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('script', function () {
  return gulp.src(path.src.script)
    .pipe(jshint())
    .pipe(gulpif(compressFlag, uglify()))
    .pipe(gulp.dest(path.dest.script));
});

gulp.task('image', function () {
  return gulp.src(path.src.image)
    .pipe(newer(path.dest.image))
    .pipe(imagemin(config.imagemin))
    .pipe(gulp.dest(path.dest.image));
});

gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('watch-assets', function () {
  gulp.watch(path.src.style, sass({outputStyle: 'compact'}));
  gulp.watch(path.dest.base).on('change', browserSync.reload);
});