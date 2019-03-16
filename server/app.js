const Koa = require("koa");
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

// const sessionStores = require('./libs/sessionStore');
// const sequelize = require('./libs/sequelize');
const allowHosts = require('./middlewares/allowHosts');
const setLocale = require('./middlewares/setLocale');
// const initPassport = require('./middlewares/passportInitialize');
const routers = require('./routes');
const returnApp = require('./middlewares/returnApp');

const app = new Koa();

require('./libs/errors')(app);
// const sessionUseExample = require('./middlewares/sessionUseExample');
// app.use(sessionUseExample());

app.use(allowHosts());
app.use(convert(bodyParser()));
app.use(cookie());
app.use(logger());
app.keys = config.keys;
// app.use(session({
//     store: sessionStores.mysql
// }));
app.use(views(roots.projectRoot, {
    // extension: 'jade',
    map: {
        jade: 'pug',
        pug: 'pug',
        html: 'pug'
    }
}));
locale(app);
app.use(i18n(app, {
  directory: path.join(roots.projectRoot, 'server', 'locales'),
  locales: config.locales,
  query: true //  optional detect querystring - `/?lang=en-US`
}));
app.use(setLocale());
app.use(convert(favicon(path.join(roots.projectRoot, '/public/favicon.ico'))));
// app.use(initPassport());
// раскоментируйте для использования сессий с использование mySql хранилища
// app.use(passport.session());
app.use(routers.forAll.routes());
// for (let name of Object.keys(routers.api)) {
//     routers.api[name].prefix(config.apiBasePath);
//     app.use(routers.api[name].routes());
// }
app.use(returnApp());

module.exports = app;
