const co = require('co');
const path = require('path');
const gutil = require('gulp-util');
const projectRoot = require('config').projectRoot;

const loadModels = require('../server/libs/db/loadModels');

module.exports = function() {
    return co(function*() {
        let args = require('yargs')
            .usage("gulp db:load --from server/fixtures/default")
            .demand(['from'])
            .describe('from', 'file to import')
            .argv;

        let dbPath = path.join(projectRoot, args.from);

        gutil.log("loading db " + dbPath);

        yield* loadModels(dbPath);

        gutil.log("loaded db " + dbPath);
    });
};