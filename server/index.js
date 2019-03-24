const fs = require('fs');
const app = require('./app');
const server = app.listen(8888);

console.log(`start!`);
console.log(`app: http://localhost:3000`);
console.log(`doc: http://localhost:3000/public/api-docs`);


if (process.env.DYNO) {
  console.log('This is on Heroku..!!');
  fs.openSync('/tmp/app-initialized', 'w');
}

module.exports = server;
