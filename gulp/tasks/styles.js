'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var sourcemaps   = require('gulp-sourcemaps');
var less = require('gulp-less');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

gulp.task('styles',['vendorCSS'] , function () {

  var createSourcemap = !global.isProd || config.styles.prodSourcemap;

  return gulp.src(config.styles.src)
    .pipe(gulpif(createSourcemap, sourcemaps.init()))
    .pipe(less())
    .on('error', handleErrors)
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .pipe(gulpif(
      createSourcemap,
      sourcemaps.write( global.isProd ? './' : null ))
    )
    .pipe(concat('main.css'))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(browserSync.stream({ once: true }));

});

gulp.task('vendorCSS', function() {
    return gulp.src(config.styles.vendorCSS)
    .pipe(concat('vendor.css'))
    .on('error', handleErrors)
    
    .pipe(gulp.dest(config.styles.dest))
    
    .pipe(browserSync.stream({ once: true }));
});
