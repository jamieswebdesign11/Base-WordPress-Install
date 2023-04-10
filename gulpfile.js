'use strict';

//Dependencies
var gulp    = require('gulp'),
		concat  = require('gulp-concat'), 
		uglify  = require('gulp-uglify'),
		rename  = require('gulp-rename'),
		sass  = require('gulp-sass'),
		autoprefixer  = require('gulp-autoprefixer'),
		//maps  = require('gulp-sourcemaps'),
		livereload  = require('gulp-livereload');
		
// Project paths.
var paths = {
  theme:        'wp-content/themes/customtheme/assets',
	blocks_dir:   'wp-content/themes/customtheme/blocks',
  scripts_all:  '_src/js/**/*.js',
  styles:       '_src/sass/**/*.scss',
	blocks:       '_src/sass/modules/_blocks.scss',
};


//Java Script
gulp.task("concatScripts", function() {
	return gulp.src(paths.scripts_all)
	//.pipe(maps.init())
	.pipe(concat("site.js"))
	//.pipe(maps.write('./'))
	.pipe(gulp.dest(paths.theme + '/javascript'))
});

gulp.task("js", ['concatScripts'], function() {
	return gulp.src(paths.theme + '/javascript/site.js')
	.pipe(uglify())
	.pipe(rename("site.min.js"))
	.pipe(gulp.dest(paths.theme + '/javascript'))
	.pipe(livereload());
});


//Sass CSS
gulp.task("compileSass", function() {
	return gulp.src(paths.styles)
	//.pipe(maps.init())
	.pipe(sass())
	.pipe(autoprefixer())
	//.pipe(maps.write('./'))
	.pipe(gulp.dest(paths.theme + '/css'))
});

gulp.task("css", ['compileSass'], function() {
	return gulp.src(paths.styles)
	.pipe(sass({ outputStyle: 'compressed' }))
	.pipe(autoprefixer())
	.pipe(rename("site.min.css"))
	.pipe(gulp.dest(paths.theme + '/css'))
	.pipe(livereload());
});

gulp.task('sass', function () {
	 return gulp.src([
		 '_src/sass/setup/_variables.scss',
		 '_src/sass/setup/_fonts.scss',
		 '_src/sass/setup/_mixins.scss',
		 '_src/sass/setup/_fade.scss',
		 '_src/sass/modules/_buttons.scss',
		 //'_src/sass/modules/_page.scss',
		 //'_src/sass/modules/_form.scss',
		 //'_src/sass/modules/_type.scss',
		 //'_src/sass/vendor/_slick.scss',
		 '_src/sass/modules/_blocks.scss'])
	 .pipe(concat('blocks.scss'))
	 .pipe(sass().on('error', sass.logError))
	 .pipe(gulp.dest('wp-content/themes/customtheme/blocks/'));
});

// Watch
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.scripts_all, ['js']);
  gulp.watch(paths.styles, ['css']);	
  gulp.watch('_src/sass/modules/_blocks.scss', ['sass']);	
});
