const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function compilaSass(){
    return gulp
    .src('css/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
}

gulp.task('default', compilaSass);

function gulpJS(){
    return gulp.src(['js/scripts/plugins.js','js/scripts/scripts.js' ])
    .pipe(concat('main.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}
gulp.task('gulpjs', gulpJS)

function pluginsJS(){
    return gulp.src(['./node_modules/jquery/dist/jquery.min.js', './node_modules/slick-carousel/slick/slick.min.js'])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/scripts/'))
    .pipe(browserSync.stream())
}
gulp.task('pluginsjs', pluginsJS);

function pluginsCSS(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick-theme.scss', 
        'node_modules/slick-carousel/slick/slick.scss',
        'node_modules/@fortawesome/fontawesome-free/css/all.min.css'])
    .pipe(concat('_plugins.scss'))
    .pipe(gulp.dest('css/scss/'))
    .pipe(browserSync.stream())
}
gulp.task('pluginscss', pluginsCSS);

function browser() {
    browserSync.init({
        baseDir: './'
    })
}
gulp.task('browser-sync', browser)

function watch(){
    gulp.watch('css/scss/**/*.scss', compilaSass)
    gulp.watch('js/scripts/*.js', gulpJS)
    gulp.watch(['*.html', '*.php'],).on('change', browserSync.reload)
}
gulp.task('watch', watch)

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'gulpjs', 'pluginsjs', 'pluginscss'));