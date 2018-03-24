const mongooseStore = require('koa-session-mongoose');

module.exports = mongooseStore.create({
  model: 'Session'
});

// in-memory store by default (use the right module instead)

// const session = require('koa-generic-session');
// const sessionStore = require('../libs/sessionStore');
//
// module.exports = session({
//     store: mongooseStore.create({
//         model: 'Session'
//     })
// });