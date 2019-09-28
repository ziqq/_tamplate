const config = require('../../config');
const gulp = require('gulp');
const cached = require('gulp-cached');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');
const browserSync = require('browser-sync');
const path = require('path');
const stream = browserSync.stream;

const processors = [
    autoprefixer({
        browsers: ['last 10 versions'],
        cascade: false,
    }),
    mqpacker({
        sort: sortMediaQueries,
    }),
    cssnano({
        preset: [
            'default',
            {
                discardComments: {
                    removeAll: true,
                },
            },
        ],
    }),
];

gulp.task('sass:development', function() {
    return gulp
        .src(config.src.sass + '/**/*.{sass,scss}')
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                // nested, expanded, compact, compressed
                outputStyle: 'expanded',
                precision: 5,
            })
        )
        .on('error', config.errorHandler)
        .pipe(cached('styles'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest.css))
        .pipe(stream());
});

gulp.task('sass:production', function() {
    return gulp
        .src(config.src.sass + '/**/*.{sass,scss}')
        .pipe(
            sass({
                // nested, expanded, compact, compressed
                outputStyle: 'expanded',
                precision: 5,
            })
        )
        .on('error', config.errorHandler)
        .pipe(postcss(processors))
        .pipe(gulp.dest(config.dest.css));
});

gulp.task('sass:watch', function() {
    gulp.watch(config.src.sass + '/**/*.{sass,scss}', ['sass:development']).on(
        'unlink',
        function(filepath) {
            delete cached.caches.styles[path.resolve(filepath)];
        }
    );
});

function isMax(mq) {
    return /max-width/.test(mq);
}

function isMin(mq) {
    return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
    A = a.replace(/\D/g, '');
    B = b.replace(/\D/g, '');

    if (isMax(a) && isMax(b)) {
        return B - A;
    } else if (isMin(a) && isMin(b)) {
        return A - B;
    } else if (isMax(a) && isMin(b)) {
        return 1;
    } else if (isMin(a) && isMax(b)) {
        return -1;
    }

    return 1;
}
