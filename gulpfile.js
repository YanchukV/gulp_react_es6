var	gulp = require('gulp'),
	minifycss = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat'),
	livereload = require('gulp-livereload'),
	gutil = require('gulp-util'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	uglify = require('gulp-uglify');

var site = 'dist',
	inputCss = 'src/stylesheets/sass/*.{sass,scss}',
	outputCss = 'src/stylesheets/css',
	outputMinCss = 'dist/assets/css',
	inputJs = 'src/javascripts/*.js',
	outputMinJs = 'dist/assets/js/components',
	inputSass = 'src/stylesheets/sass/**/*.{sass,scss}';

gulp.task('connect', function() {
  connect.server({
    root: site,
    livereload: true
  });
});

gulp.task('html', function(){
	gulp.src(site+'/*.html')
	.pipe(connect.reload());
});

gulp.task('styles', function() {
	gulp.src(inputCss)
	.pipe(sass({
		outputStyle: 'expanded'
	}).on('error', sass.logError))
	.pipe(autoprefixer('last 10 version'))
	.pipe(gulp.dest(outputCss))
});

gulp.task('cssmin', function() {
  return gulp.src(outputCss+'/*.css')
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(outputMinCss))
    .pipe(connect.reload());
});

gulp.task('build', function () {
	process.env.NODE_ENV = 'production';
		browserify (
			{
				entries: './src/jsx/app.jsx',
				extensions: ['.jsx'],
				debug: true
			}
		)
		.transform('babelify', {presets: ['es2015', 'react']})
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(gulp.dest("src/javascripts/"));

});

gulp.task('js', function() {
  return gulp.src(inputJs)
    .pipe(uglify().on('error', gutil.log))
	.pipe(concat('app.min.js'))
    .pipe(gulp.dest(outputMinJs))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch("src/jsx/*.jsx", ['build'])
	gulp.watch(inputJs, ['js'])
	gulp.watch(outputCss+'/*.css', ['cssmin'])
	gulp.watch(inputCss, ['styles'])
	gulp.watch(inputSass, ['styles'])
	gulp.watch(site+'/*.html', ['html']);
});

gulp.task('default', ['connect', 'html', 'styles', 'cssmin', 'build', 'js', 'watch'], function() {

});