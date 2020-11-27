import gulp from 'gulp';
import svgmin from 'gulp-svgmin';
import changed from 'gulp-changed';
import plumber from 'gulp-plumber';
import config from '../config';

gulp.task('svgo', () => gulp
    .src(config.src.files + '/svgo/**/*.svg')
    .pipe(plumber({
        errorHandler: config.errorHandler
    }))
    .pipe(changed(config.dest.iconsSvg + '/'))
    .pipe(svgmin({
        js2svg: {
            pretty: true
        },
        plugins: [{
            removeDesc: true
        }, {
            cleanupIDs: true
        }, {
            mergePaths: false
        }]
    }))
    .pipe(gulp.dest(config.dest.iconsSvg + '/'))
);

const build = () => gulp.series('svgo');
const watch = () => () => gulp.watch(config.src.img + '/svgo/**/*.svg', gulp.parallel('svgo'));

module.exports.build = build;
module.exports.watch = watch;

// gulp.task('svgo', function() {
//     return gulp
//         .src(config.src.files + '/svgo/**/*.svg')
//         .pipe(
//             plumber({
//                 errorHandler: config.errorHandler
//             })
//         )
//         .pipe(changed(config.dest.iconsSvg + '/'))
//         .pipe(
//             svgmin({
//                 js2svg: {
//                     pretty: true
//                 },
//                 plugins: [
//                     {
//                         removeDesc: true
//                     },
//                     {
//                         cleanupIDs: true
//                     },
//                     {
//                         mergePaths: false
//                     }
//                 ]
//             })
//         )
//         .pipe(gulp.dest(config.dest.iconsSvg + '/'));
// });

// gulp.task('svgo:watch', function() {
//     gulp.watch(config.src.img + '/svgo/**/*.svg', ['svgo']);
// });
