var gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  coffee = require('gulp-coffee'),
  jade = require('gulp-jade'),
  concat = require('gulp-concat'),
  livereload = require('gulp-livereload'),
  watch = require('gulp-watch'),
  prompt = require('gulp-prompt'),
  connect = require('connect'),
  http = require('http'),
  config = require('./config.json');

gulp.task('stylus', function() {
  gulp.src('src/stylus/*.styl')
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

gulp.task('serve', ['default'], function() {
  return gulp.src('./')
    .pipe(prompt.prompt({type:'input', name:'port', 'message':'Enter port number'}, function(input) {
      var port = input.port;
      var app = connect()
        .use(connect.logger('dev'))
        .use(connect.static('./'));
      http.createServer(app).listen(port); 
      console.info('Server running on port: ', port);
    }
  ));
});

gulp.task('watchScripts', function() {
  gulp.watch('src/stylus/*.styl', ['stylus']);
  gulp.watch('src/coffee/*.coffee', ['js']);
  gulp.watch('src/jade/**/*.jade', ['jade']);
  gulp.watch('./config.json', ['jade']);
});

gulp.task('default', ['jade', 'stylus', 'coffee', 'js', 'watchScripts']);
