var gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  coffee = require('gulp-coffee'),
  jade = require('gulp-jade'),
  concat = require('gulp-concat'),
  livereload = require('gulp-livereload'),
  watch = require('gulp-watch'),
  config = require('./config.json');

gulp.task('stylus', function() {
  gulp.src('src/stylus/*.styl')
    .pipe(watch())
    .pipe(stylus({
      use:['nib'], 
      set:['include css']}
    ))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('jade', function() {
  gulp.src('src/jade/index.jade')
    .pipe(watch())
    .pipe(jade({locals: config.jadeLocals, pretty:true}))
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});

gulp.task('coffee', function() {
  gulp.src('src/coffee/*.coffee')
    .pipe(watch())
    .pipe(coffee())
    .pipe(gulp.dest('src/js'))
    .pipe(livereload());
});

gulp.task('js', ['coffee'], function() {
  gulp.src(config.scripts, {base: './'})
    .pipe(concat('app.js'))
    .pipe(gulp.dest('js'))
    .pipe(livereload());
});

gulp.task('default', ['jade', 'stylus', 'coffee', 'js']);
