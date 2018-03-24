const co = require('co');
const gutil = require('gulp-util');

const createEmptyDb = require('../server/libs/db/createEmptyDb');

module.exports = function() {
    return co(function*() {
        gutil.log("clearing db ...");

        yield* createEmptyDb();

        gutil.log("cleaned db");
    });
};