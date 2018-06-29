const secretData = require('./secretData.json');

module.exports = {
    dev: {
        username: 'root',
        password: secretData.mysqlPass,
        database: 'momonga_test',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    test: {
        username: 'root',
        password: secretData.mysqlPass,
        database: 'momonga_test',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    prod: {
        username: 'root',
        password: secretData.mysqlPass,
        database: 'momonga',
        host: '127.0.0.1',
        dialect: 'mysql'
    }
};