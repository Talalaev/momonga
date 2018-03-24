const oid = require('../libs/db/oid');

require('../models/user');
require('../models/buying');

exports.User = [
    {
        _id: oid('test-user'),
        displayName: "Momo",
        email: "momo@momonga.ru",
        password: "1234"
    }
];

exports.Buying = [
    {
        name: 'Phone',
        price: 2003,
        date: new Date,
        created: new Date,
        buyer: oid('test-user')
    },
    {
        name: 'Glass',
        price: 165,
        date: new Date,
        created: new Date,
        buyer: oid('test-user')
    },
    {
        name: 'Web-camera',
        price: 1675,
        date: new Date,
        created: new Date,
        buyer: oid('test-user')
    }
];