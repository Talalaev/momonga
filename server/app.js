const Koa = require("koa");
const app = new Koa();
const path = require('path');
const config = require('config');
const favicon = require('koa-favicon');
const session = require("koa-generic-session");
const passport = require('koa-passport');
const logger = require('koa-logger');

const bodyParser = require('koa-bodyparser');
const cookie = require('koa-cookie').default;

const roots = require('config');
const views = require('koa-views');
const i18n = require('koa-i18n');
const convert = require('koa-convert');
const locale = require('koa-locale');

const sessionStore = require('./libs/sessionStore');
const sessionUseExample = require('./middlewares/sessionUseExample');

const sequelize = require('./libs/sequelize');
// const mongoose = require('./libs/mongoose');
//
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log('db connected!');
// });

const allowHosts = require('./middlewares/allowHosts');
app.use(convert(bodyParser()));
app.use(cookie());

app.use(allowHosts());
app.use(logger());

app.keys = config.keys;
app.use(session({
    store: sessionStore
}));
// app.use(convert(session({
//     store: sessionStore,
//     olling: true,
//     cookie: {
//         maxage: 30 * 60 * 1000
//     }
// })));
// app.use(convert(session({
//     store: sessionStore
// })));
// app.use(sessionUseExample());

locale(app);
app.use(views(roots.projectRoot, {
    // extension: 'jade',
    map: {
        jade: 'pug',
        pug: 'pug',
        html: 'pug'
    }
}));

app.use(i18n(app, {
  directory: path.join(roots.projectRoot, 'server', 'locales'),
  locales: config.locales,
  query: true //  optional detect querystring - `/?lang=en-US`
}));

const setLocale = require('./middlewares/setLocale');
app.use(setLocale());

app.use(convert(favicon(path.join(roots.projectRoot, '/public/favicon.ico'))));

const initPassport = require('./middlewares/passportInitialize');
app.use(initPassport());
app.use(passport.session());

const forAll = require('./routes/forAll');
app.use(forAll.routes());
const auth = require('./routes/auth');
app.use(auth.routes());

const returnApp = require('./middlewares/returnApp');
app.use(returnApp());

app.on('error', async function (err) {
    this.body = 'server error' + err;
});


module.exports = app;

console.log("App Run !");