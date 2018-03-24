const mongoose = require('mongoose');
const co = require('co');
const thunkify = require('thunkify');

// tried using pow-mongoose-fixtures,
// but it fails with capped collections, it calls remove() on them => everything dies
// so rolling my own tiny-loader
module.exports = function*(data) {
    let modelsData = (typeof data == 'string') ? require(data) : data;

    for (let modelName in modelsData) {
        let Model = mongoose.models[modelName];
        yield Model.remove({});
        yield* loadModel(Model, modelsData[modelName]);
    }
};

// load data into the DB, replace if _id is the same
function* loadModel(Model, data) {
    for (let i = 0; i < data.length; i++) {
        yield Model.create(data[i]);
    }
}