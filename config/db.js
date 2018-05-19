const mysqlPass = require('./mysqlPass');

module.exports = {
    dev: {
        username: 'root',
        password: mysqlPass.password,
        database: 'momonga_test',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    test: {
        username: 'root',
        password: mysqlPass.password,
        database: 'momonga_test',
        host: '127.0.0.1',
        dialect: 'mysql'
    },
    prod: {
        username: 'root',
        password: mysqlPass.password,
        database: 'momonga',
        host: '127.0.0.1',
        dialect: 'mysql'
    }
};