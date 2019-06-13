var gulp = require('gulp');
var config = require('../config');
var include = require('gulp-include');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('js', function() {
    return gulp
        .src([config.src.js + '/*.js', '!' + config.src.js + '/*.libs.js'])
        .pipe(
            plumber({
                errorHandler: config.errorHandler,
            })
        )
        .pipe(include())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest.js + '/'))
        .pipe(reload({ stream: true }));
});

gulp.task('js:libs', function() {
    return gulp
        .src(config.src.js + '/*libs.js')
        .on('error', function() {
            notify('Javascript include error');
        })
        .pipe(include())
        .pipe(uglify())
        .pipe(gulp.dest(config.dest.js + '/'))
        .pipe(reload({ stream: true }));
});

// gulp.task('js:assets', function() {
//     return gulp
//         .src([config.src.jsAssets + '/yandex.map.js'])
//         .pipe(gulp.dest(config.dest.jsAssets + '/'));
// });

// gulp.task('js:data', function() {
//     return gulp
//         .src([config.src.jsData + '/**/*'])
//         .pipe(gulp.dest(config.dest.jsData + '/'));
// });

gulp.task('js:all', function(js) {
    runSequence('js:libs', 'js', js);
});

gulp.task('js:watch', function() {
    gulp.watch(
        [
            config.src.js + '/**/*.js',
            '!' + config.src.js + '/libs.js',
            '!' + config.src.js + '/_lib',
            '!' + config.src.js + '/assets',
        ],
        ['js']
    );
    gulp.watch([config.src.js + '/*libs.js'], ['js:libs']);
});
