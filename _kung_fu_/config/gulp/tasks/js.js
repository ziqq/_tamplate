// const config = require('../../config');
// const gulp = require('gulp');
// const path = require('path');
// const include = require('gulp-include');
// const uglify = require('gulp-uglify');
// const babel = require('gulp-babel');
// const sourcemaps = require('gulp-sourcemaps');
// const runSequence = require('run-sequence');
// const plumber = require('gulp-plumber');
// const browserSync = require('browser-sync');
// const reload = browserSync.reload;
// const cached = require('gulp-cached');
// const rename = require('gulp-rename');
// const concat = require('gulp-concat');
// const notify = require('gulp-notify');

// gulp.task('js:development', function() {
//     return (
//         gulp
//             .src([
//                 config.src.js + '/*.js',
//                 '!' + config.src.js + '/*.libs.js',
//                 '!' + config.src.js + '/vendors.js',
//             ])
//             .pipe(plumber({ errorHandler: config.errorHandler }))
//             // .pipe(cached('jsScripts'))
//             .pipe(include())
//             .pipe(sourcemaps.init())
//             .pipe(babel())
//             .pipe(sourcemaps.write())
//             .pipe(gulp.dest(config.dest.js + '/'))
//             .pipe(reload({ stream: true }))
//     );
// });

// gulp.task('js:production', function() {
//     return gulp
//         .src([
//             config.src.js + '/*.js',
//             '!' + config.src.js + '/*.libs.js',
//             '!' + config.src.js + '/vendors.js',
//         ])
//         .pipe(plumber({ errorHandler: config.errorHandler }))
//         .pipe(include())
//         .pipe(babel())
//         .pipe(uglify())
//         .pipe(gulp.dest(config.dest.js + '/'));
// });

// gulp.task('js:vendors', function() {
//     return gulp
//         .src(config.src.js + '/vendors.js')
//         .pipe(plumber({ errorHandler: config.errorHandler }))
//         .pipe(include())
//         .pipe(gulp.dest(config.dest.js + '/'))
//         .pipe(reload({ stream: true }));
// });

// gulp.task('js:vendors:production', function() {
//     return gulp
//         .src(config.src.js + '/vendors.js')
//         .pipe(plumber({ errorHandler: config.errorHandler }))
//         .pipe(include())
//         .pipe(uglify())
//         .pipe(gulp.dest(config.dest.js + '/'));
// });

// gulp.task('js:data', function() {
//     return gulp
//         .src([config.src.jsData + '/**/*'])
//         .pipe(gulp.dest(config.dest.jsData + '/'));
// });

// gulp.task('js:all:development', function(js) {
//     runSequence('js:data', 'js:vendors', 'js:development', js);
// });

// gulp.task('js:all:production', function(js) {
//     runSequence('js:data', 'js:vendors', 'js:production', js);
// });

// gulp.task('js:watch', function() {
//     gulp.watch(
//         [config.src.js + '/*.js', '!' + config.src.js + '/vendors.js'],
//         ['js:development']
//     );
//     gulp.watch([config.src.js + '/vendors.js'], ['js:vendors']);
// });
