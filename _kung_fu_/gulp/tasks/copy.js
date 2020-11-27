// var gulp = require('gulp');
// var imagemin = require('gulp-imagemin');
// var newer = require('gulp-newer');
// var runSequence = require('run-sequence');
// var config = require('../config.js');

// gulp.task('copy:fonts', function() {
//     return gulp
//         .src(config.src.fonts + '/**/*.{ttf,eot,woff,woff2}')
//         .pipe(gulp.dest(config.dest.fonts));
// });

// gulp.task('copy:libs', function() {
//     return gulp
//         .src(config.src.libs + '/**/*.*')
//         .pipe(gulp.dest(config.dest.libs));
// });

// gulp.task('copy:rootfiles', function() {
//     return gulp
//         .src([config.src.root + '/*.*', '!' + config.src.assets + '/**/*.*'])
//         .pipe(gulp.dest(config.dest.root));
// });

// gulp.task('copy:files', function() {
//     return gulp
//         .src([
//             config.src.files + '/**/*.*',
//             '!' + config.src.files + '/svgo/**/*.*',
//             '!' + config.src.iconsPng + '/**/*.*',
//             '!' + config.src.iconsSvg + '/**/*.*'
//         ])
//         .pipe(gulp.dest(config.dest.files));
// });

// gulp.task('copy:images', function() {
//     return gulp
//         .src(config.src.images + '/**/*.{jpg,png,jpeg,svg,gif}')
//         .pipe(newer(config.src.images + '/**/*.{jpg,png,jpeg,svg,gif}'))
//         .pipe(gulp.dest(config.dest.images));
// });

// gulp.task('copy:images:production', function() {
//     return gulp
//         .src(config.src.images + '/**/*.{jpg,png,jpeg,svg,gif}')
//         .pipe(
//             imagemin(
//                 [
//                     imagemin.gifsicle({ interlaced: true }),
//                     imagemin.jpegtran({ progressive: true }),
//                     imagemin.optipng(),
//                     imagemin.svgo([{ removeViewBox: false }, { minifyStyles: false }]),
//                 ],
//                 {
//                     optimizationLevel: 3,
//                 }
//             )
//         )
//         .pipe(gulp.dest(config.dest.images));
// });

// gulp.task('copy', function(cp) {
//     runSequence(
//         'copy:libs',
//         'copy:fonts',
//         'copy:rootfiles',
//         'copy:files',
//         'copy:images',
//         cp
//     );
// });

// gulp.task('copy:production', function(cp) {
//     runSequence(
//         'copy:libs',
//         'copy:fonts',
//         'copy:rootfiles',
//         'copy:files',
//         'copy:images:production',
//         cp
//     );
// });

// gulp.task('copy:watch', function() {
//     gulp.watch(config.src.images + '/**/*.{jpg,png,jpeg,svg,gif}', [
//         'copy:img'
//     ]);
// });

import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import runSequence from 'run-sequence';
import config from '../config.js';
// import imagemin from 'gulp-imagemin';

gulp.task('copy:img', () => gulp
  .src([
    config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}',
    '!' + config.src.img + '/svgo/**/*.*'
    ])
    // .pipe(imagemin([], {
    //     verbose: true
    // }))
  .pipe(gulp.dest(config.dest.img))
);

gulp.task('copy:fonts', () => gulp
  .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
  .pipe(gulp.dest(config.dest.fonts))
);

gulp.task('copy:data', () => gulp
  .src(config.src.data + '/**/*.*')
  .pipe(gulp.dest(config.dest.data))
);

gulp.task('copy:libs', () => gulp
  .src(config.src.libs + '/**/*.*')
  .pipe(gulp.dest(config.dest.libs))
);

gulp.task('copy:rootfiles', () => gulp
    .src([config.src.root + '/*.*', '!' + config.src.assets + '/**/*.*'])
    .pipe(gulp.dest(config.dest.root))
);

const build = gulp => gulp.series('copy:img', 'copy:fonts');
const watch = gulp => () => gulp.watch(config.src.img + '/*', gulp.parallel('copy:img', 'copy:fonts'));

module.exports.build = build;
module.exports.watch = watch;

