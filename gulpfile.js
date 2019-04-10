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
const git = require('gulp-git');
const argv = require('yargs').argv;
const package = require('./package.json');


let {major: changeMajor, minor: changeMinor, micro: changeMicro} = argv;
let [major, minor, micro] = package.version.split('.');
let version = package.version;

if (changeMajor) {
  version = `${++major}.0.0`;
}
else if (changeMinor) {
  version = `${major}.${++minor}.0`
}
else if (changeMicro) {
  version = `${major}.${minor}.${++micro}`;
}


// const mongoose = require('./server/libs/mongoose');

process.on('uncaughtException', function(err) {
    console.error(err.message, err.stack, err.errors);
    process.exit(255);
});

gulp.task('deploy', function() {
  runSequence(
    'change-version-pkg',
    'change-version-readme',
    // 'build-prod:app',
    'git:add',
    // 'git:commit',
    // 'push:heroku'
  );
});

gulp.task('git:add', function() {
  var options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
    customTemplatingThing: "test" // content passed to lodash.template()
  };
  return gulp.src('./*')
    .pipe(exec('git add .', options))
    .pipe(exec(`git commit -m "build version: ${version}"`))
    // .pipe(exec(`git push heroku master`));
});

gulp.task('git:commit', function() {
  gulp.src('./*')
    .pipe(git.commit(`build version: ${version}`));
});

gulp.task('push:heroku', function(){
  git.push('heroku', 'master', {args: " -f"}, function (err) {
    if (err) throw err;
  });
});

gulp.task('change-version', function() {
  runSequence(['change-version-pkg', 'change-version-readme']);
});

gulp.task('change-version-pkg', function() {
  gulp.src(['./package.json'])
    .pipe(replace(/"version": ?"\d\.\d\.\d",/, `"version": "${version}",`))
    .pipe(gulp.dest('./'));
});

gulp.task('change-version-readme', function() {
  gulp.src(['./README.md'])
    .pipe(replace(/Version \d\.\d\.\d/, `Version: ${version}`))
    .pipe(gulp.dest('./'));
});

gulp.task('build:app', function () {
  runSequence('del-dist', 'build:pwa', ['beautify', 'del-etc']);
});

gulp.task('build-prod:app', function () {
  runSequence('del-dist', 'build-prod:pwa', ['beautify', 'del-etc']);
});

gulp.task('build-prod:pwa', shell.task(`npm --prefix ${path.resolve(__dirname, './client/pwa')} run build:prod`));

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