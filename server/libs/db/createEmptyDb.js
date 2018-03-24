const mongoose = require('mongoose');
const co = require('co');
const thunkify = require('thunkify');

module.exports = function *() {
    let db = mongoose.connection.db;

    // if (mongoose.connection.readyState == 1) { // connected
    //     db = mongoose.connection.db;
    // } else {
    //     console.log('create connetcion');
    //     // thunkify вернет функцию пригодную для работы в генераторе через yield
    //     db = yield thunkify(mongoose.connection.on)('open');
    // }
    yield* clearDatabase(db);

    /*
    * Deprecated since version 3.0.0:
    * db.collection.ensureIndex() is now an alias for db.collection.createIndex().
    * Creates an index on the specified field if the index does not already exist.
    */
    yield* ensureIndexes();

    yield* ensureCapped();
};

function* clearDatabase(db) {
    let collections = yield new Promise(function(resolve, reject) {
        db.listCollections().toArray(function(err, items) {
            if (err) return reject(err);
            resolve(items);
        });
    });

    let collectionNames = collections
        .map(function(collection) {
            //console.log(collection.name);
            //var collectionName = collection.name.slice(db.databaseName.length + 1);
            if (collection.name.indexOf('system.') === 0) {
                return null;
            }
            return collection.name;
        })
        .filter(Boolean);

    yield collectionNames.map(function(name) {
        return thunkify(db.dropCollection)(name);
    });
}



// wait till indexes are complete, especially unique
// required to throw errors
function* ensureIndexes(db) {
    yield mongoose.modelNames().map(function(modelName) {
        let model = mongoose.models[modelName];
        return thunkify(model.ensureIndexes.bind(model))();
    });
}


// ensure that capped collections are actually capped
function* ensureCapped(db) {
    yield mongoose.modelNames().map(function(modelName) {
        let model = mongoose.models[modelName];
        let schema = model.schema;
        if (!schema.options.capped) return;

        return thunkify(db.command)({
            convertToCapped: model.collection.name,
            size: schema.options.capped
        });
    });
}