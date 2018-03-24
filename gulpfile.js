const config = require('config');
const gulp = require('gulp');
const path = require('path');
const fs = require('fs');
const runSequence = require('run-sequence');
const gp = require('gulp-load-plugins')();
const webpack = require('gulp-webpack');

const mongoose = require('./server/libs/mongoose');

process.on('uncaughtException', function(err) {
    console.error(err.message, err.stack, err.errors);
    process.exit(255);
});

gulp.task('db:load', require('./tasks/dbLoad'));
// gulp.task('db:clear', require('./tasks/dbClear'));

// when queue finished, close db
// orchestrator events (sic!)
gulp.on('stop', function() {
    mongoose.disconnect();
});

gulp.on('err', function(gulpErr) {
    if (gulpErr.err) {
        // cause
        console.error("Gulp error details", [
            gulpErr.err.message,
            gulpErr.err.stack,
            gulpErr.err.errors
        ].filter(Boolean));
    }
    mongoose.disconnect();
});