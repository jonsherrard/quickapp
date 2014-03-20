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
  delete require.cache[require.resolve('./config.json')];
  return gulp.src('src/jade/index.jade')
    .pipe(jade({locals: require('./config.json').jadeLocals, pretty:true}))
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});

gulp.task('coffee', function() {
  return gulp.src('src/coffee/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('src/js'));
});

gulp.task('js', ['coffee'], function() {
  return gulp.src(config.scripts, {base: './'})
    .pipe(concat('app.js'))
    .pipe(gulp.dest('js'))
    .pipe(livereload());
});

gulp.task('watchScripts', function() {
  gulp.watch('src/coffee/*.coffee', ['js']);
  gulp.watch('src/jade/**/*.jade', ['jade']);
  gulp.watch('./config.json', ['jade']);
});

gulp.task('default', ['jade', 'stylus', 'coffee', 'js', 'watchScripts']);
