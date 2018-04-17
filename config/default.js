const defer = require('config/defer').deferConfig;
const path = require('path');

module.exports = {
    // secret data can be moved to env variables
    // or a separate config
    keys: ['8a460b8a4416727732c9335258371119'],
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
    mysql: {
        user: "root",
        password: "password",
        database: "momonga",
        host: "127.0.0.1"
    },
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
    locales: [
        'ru',
        'en'
    ],
    defaultLang: 'ru'
};