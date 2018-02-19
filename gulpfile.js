const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssSorting = require('postcss-sorting');
const cssNext = require('postcss-cssnext')

var paths = {
	js: 'dev/**/*.js',
	css: 'dev/**/*.pcss'
};

gulp.task('js', function() {
	gulp.src('dev/**/*.js')
	 .pipe(sourcemaps.init())
	 .pipe(concat('all.js'))
	 .pipe(babel({
	 	presets: ['env']
	 })) 
	 .pipe(sourcemaps.write('.'))
	 .pipe(gulp.dest('dist'))
});

gulp.task('css', function() {
	var plugins = [
     autoprefixer({browsers: ['last 1 version']}),
     cssSorting(),
     cssNext({
     	features: {
     		customProperties: false
     	}
     })
	]
	gulp.src('dev/**/*.pcss')
	 .pipe(postcss(plugins))
	 .pipe(concat('style.css'))
	 .pipe(gulp.dest('dist'))
});

gulp.task('watcher', function() {
	gulp.watch(paths.js, ['js']);
	gulp.watch(paths.css, ['css']);
});

gulp.task('default', ['watcher', 'js', 'css']);