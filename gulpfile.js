var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var _ = require('lodash/core');

// Compile SCSS into CSS
gulp.task('sass', function() {
	return gulp.src('./styles/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('main.css'))
		.pipe(gulp.dest('./static/styles/'));
});

gulp.task('sass:watch', function() {
	return gulp.watch('./styles/**/*.scss', ['sass']);
});

gulp.task('es6', function() {
	return gulp.src('./scripts/**/*.es6')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./static/scripts/'));
});

gulp.task('es6:watch', function() {
	return gulp.watch('./scripts/**/*.es6', ['es6']);
});

var libraries = ['d3', 'lodash']
gulp.task('lib', function() {
	var libPaths = _.map(libraries, function (lib) {
		return "./node_modules/" + lib + "/" + lib + ".min.js";
	});
	return gulp.src(libPaths)
		.pipe(concat('libraries.js'))
		.pipe(gulp.dest('./static/scripts/'))
});

gulp.task('watch', ['sass:watch', 'es6:watch']);
gulp.task('start', ['lib', 'watch']);
gulp.task('default', ['start']);
