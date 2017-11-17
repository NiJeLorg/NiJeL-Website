'use strict';

// require modules/dependencies
const gulp = require('gulp'),
    sass = require('gulp-sass'),
    nodemon = require('gulp-nodemon'),
    pug = require('gulp-pug'),
    webpack = require('webpack-stream'),
    browserSync = require('browser-sync');

// paths
const paths = {
    app: ['app/**/*.{js,sass,pug}'],
    sass: 'app/sass/**/*.scss',
    pug: ['!app/shared-views/**', 'app/**/*.pug'],
    entryJs: 'app/js/app.js',
    js: 'app/js/**/*.js',
    public: 'public'
};

// gulp tasks
gulp.task('pug2html', () => {
    gulp.src(paths.pug)
        .pipe(pug())
        .pipe(gulp.dest(paths.public))
        .pipe(browserSync.stream());
});


gulp.task('sass2css', () => {
    gulp.src('app/sass/app.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.public + '/css'))
        .pipe(browserSync.stream());
});


gulp.task('bundleJS', () => {
    gulp.src(paths.entryJs)
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest(paths.public + '/js'))
        .pipe(browserSync.stream());
});

gulp.task('nodemon', () => {
    nodemon({
            script: 'index.js',
            ext: 'js',
            ignore: ['public/', 'node_modules/', 'app/']
        })
        .on('restart', function() {
            console.log('>> node restart');
        });
});

gulp.task('import_data', () => {
    let data_import = require('./server/data/data_importer');
   data_import.run_data_import();
});

gulp.task('watch', () => {
    browserSync.init(null, {
        proxy: 'localhost:3000',
        port: 5000,
        browser: 'google chrome',
        open: false
    });
    gulp.watch(paths.sass, ['sass2css']);
    gulp.watch(paths.pug, ['pug2html']);
    gulp.watch(paths.js, ['bundleJS']);
});


gulp.task('build', ['pug2html', 'sass2css', 'bundleJS']);

gulp.task('default', ['nodemon', 'build', 'watch']);
