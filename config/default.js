const defer = require('config/defer').deferConfig;
const path = require('path');
const secretData = require('./secretData.json');

let mysql = {
  user: "root",
  password: secretData.mysqlPass,
  database: process.env.NODE_ENV == 'production' ? "momonga" : "momonga_test",
  host: "127.0.0.1"
};

if (process.env.DYNO) mysql = parseDBUrl(process.env.CLEARDB_DATABASE_URL);

module.exports = {
    // secret data can be moved to env variables
    // or a separate config
    keys: secretData.keys,
    mongoose: {
        uri: 'mongodb://localhost:27017/momonga',
        options: {
            server: {
                socketOptions: {
                    keepAlive: 1
                },
                poolSize: 5
            }
        }
    },
    mysql,
    crypto: {
        hash: {
            length: 128,
            // may be slow(!): iterations = 12000 take ~60ms to generate strong password
            iterations: process.env.NODE_ENV == 'production' ? 12000 : 1
        }
    },
    template: {
        // template.root uses config.root
        root: defer(function(cfg) {
            return path.join(cfg.projectRoot, 'server', 'templates');
        }),
        path: defer(function(cfg) {
            return path.join(cfg.projectRoot, 'assets');
        }),
        app: defer(function(cfg) {
            return path.join(cfg.projectRoot, 'client', 'dist');
        })
    },
    projectRoot: process.cwd(),
    apiBasePath: '/api',
    locales: [
        'ru',
        'en'
    ],
    defaultLang: 'ru'
};

function parseDBUrl(url) {
  url = url.slice(8);
  let middle =  url.search('@');
  let [user, password] = url.slice(0, middle).split(':');
  let [host, database] = url.slice(middle + 1).split('/');
  // database = database.split('?')[0];

  return {user, password, host, database};
}