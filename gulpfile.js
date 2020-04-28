const gulp         = require('gulp'),
			browserSync  = require('browser-sync'),
			scss         = require('gulp-sass'),
			rename 			 = require('gulp-rename'),
			autoprefixer = require('gulp-autoprefixer'),
			csso 		 		 = require('gulp-csso'),
			sourcemaps   = require('gulp-sourcemaps'),
			notify 			 = require('gulp-notify'),
			uglify 			 = require('gulp-uglify'),
			concat 			 = require('gulp-concat'),
			iconfont 	   = require('gulp-iconfont'),
			iconfontCss  = require('gulp-iconfont-css'),
			sassGlob 		 = require('gulp-sass-glob'),
			tinypng 		 = require('gulp-tinypng');
			//critical 		 = require('critical').stream;

// Server BrowserSync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });
});

// JS
gulp.task('js', function() {
	return gulp.src(['app/js/libs/*.js', 'app/js/*.js', '!app/js/*.min.js'])
	// .pipe(sourcemaps.init())
	.pipe(concat('script.min.js'))
	.pipe(uglify()) 
	// .pipe(sourcemaps.write())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.stream());	
});

// SASS
gulp.task('scss', function () {
	return gulp.src('app/scss/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(scss({outputStyle: 'expand'}).on('error', notify.onError()))
		.pipe(rename({suffix: '.min', prefix : ''}))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());		
});


// HTML
gulp.task('html', function() {
	return gulp.src('app/**/*.html')
	.pipe(browserSync.stream());	
});


// TinyPNG
gulp.task('tinypng', function() {
	return gulp.src(['app/images/*.png', 'app/images/*.jpg'])
		.pipe(tinypng('eGwHsgRHgRYLa2syNI121TJRmNwb7J46'))
		.pipe(gulp.dest('app/images/'));
});

// ICONS FONT
const fontName = 'icons';

gulp.task('iconfont', async() => {
  gulp.src(['app/images/icons/*.svg'])
    .pipe(iconfontCss({
			fontName: fontName,
			targetPath: '../../scss/_icons.scss',
			fontPath: '../fonts/iconfonts/'			
    }))
    .pipe(iconfont({
			fontName: fontName,
			formats: [ 'svg', 'ttf', 'eot', 'woff', 'woff2' ],
			normalize: true,
			fontHeight: 1001
    }))
    .pipe(gulp.dest('app/fonts/iconfonts'));
});

// Build
gulp.task('build', function () {
	return gulp.src('app/css/*.min.css')
	.pipe(csso({
		sourceMap: false
	}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

// Critical CSS
// gulp.task('critical', function () {
// 	return gulp.src('app/index.html')
// 			.pipe(critical({base: 'app/', inline: true, css: ['app/css/main.min.css']}))
// 			.on('error', notify.onError())
// 			.pipe(gulp.dest('dist'));
// });

gulp.task('watch', function() {
	gulp.watch('app/**/*.html', gulp.series('html'));
	gulp.watch('app/scss/**/*.scss', gulp.series('scss'));
	gulp.watch(['app/js/libs/**/*.js', 'app/js/*.js', '!app/js/*.min.js'], gulp.series('js'));
	gulp.watch('app/images/icons/*.svg', gulp.series('iconfont'));
});

gulp.task('default', gulp.series(
	'iconfont',
	gulp.parallel(
		'scss',
		'js',
	),
	gulp.parallel(
		'watch',
		'browser-sync')
)); 