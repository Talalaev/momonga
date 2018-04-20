// const MemoryStore = require('koa-session-memory');
const mongooseStore = require('koa-session-mongoose');
const MysqlStore = require('koa-mysql-session');
const config = require('config');

let stores = {};
// stores.memory = new MemoryStore();
stores.mysql = new MysqlStore(config.mysql);
stores.mongoose = mongooseStore.create({
    model: 'Session'
});

module.exports = stores;
