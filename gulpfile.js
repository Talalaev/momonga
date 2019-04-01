const config = require('config');
const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const runSequence = require('run-sequence');
const gp = require('gulp-load-plugins')();
const webpack = require('gulp-webpack');
const del = require('del');
const exec = require('gulp-exec');
const shell = require('gulp-shell');
const replace = require('gulp-replace');
const beautify = require('gulp-jsbeautifier');


// const mongoose = require('./server/libs/mongoose');

process.on('uncaughtException', function(err) {
    console.error(err.message, err.stack, err.errors);
    process.exit(255);
});

gulp.task('build:app', function () {
  runSequence('del-dist', 'build:pwa', ['beautify', 'del-etc']);
});

gulp.task('build:pwa', shell.task(`npm --prefix ${path.resolve(__dirname, './client/pwa')} run build`));

gulp.task('beautify', () =>
  gulp.src(['./client/pwa/dist/index.html'])
    .pipe(replace('<script>document.write(\'<base href="\' + document.location.origin + \'/app" />\');</script>', '<script type="replace/back"></script>'))
    .pipe(beautify())
    .pipe(replace('<script type="replace/back"></script>', '<script>document.write(\'<base href="\' + document.location.origin + \'/app" />\');</script>'))
    .pipe(gulp.dest('./client/pwa/dist'))
);

gulp.task('del-dist', function() {
  return del.sync(['./client/pwa/dist']);
});

gulp.task('del-etc', function() {
  return del.sync(['./client/pwa/etc']);
});

gulp.task('db:load', require('./tasks/dbLoad'));
// gulp.task('db:clear', require('./tasks/dbClear'));

// when queue finished, close db
// orchestrator events (sic!)
// gulp.on('stop', function() {
//     mongoose.disconnect();
// });
//
// gulp.on('err', function(gulpErr) {
//     if (gulpErr.err) {
//         // cause
//         console.error("Gulp error details", [
//             gulpErr.err.message,
//             gulpErr.err.stack,
//             gulpErr.err.errors
//         ].filter(Boolean));
//     }
//     mongoose.disconnect();
// });