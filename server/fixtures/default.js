// password: 123456
const
    passwordHash = 'd4f467a4e294181d6f1b23e9ffd2944a28fa31001a87d4a7867c02bedaf5480fd63a333dfa71a7df716e39d087b6a5a2af896da8876843400facbfcbea113a26442ea1d6de0f7fa3f6228c5ddd4e339a5756c21325392fab57b71611958ec7a81c9a8c661ea5163d37ca13e35a26125a8071c75d29d27f27fe18727646e09bc3',
    salt = 'hRkoQBgpTpGCxYslSXgRybqCaIBuqg8xQwXRp/mzw1Q64QP63kbW12UhIc5fF0NsOuxNIpdivO7q7Y4WQub+zOzmOEf76uIFhJAd/VQDIGDHBNLqJ6VmyxPOO4ffX5394JvLtYnyNDNZGKMxDcwTdpISq73/Q0qWHXRmqHamymM=',
    createdAt = new Date,
    updatedAt = new Date,
    oid = require('../libs/db/oid');

exports.users = [{
    id: 1,
    login: 'momo',
    email: 'momo@momonga.ru',
    passwordHash,
    salt,
    createdAt: new Date('2018-04-08 12:15:28'),
    updatedAt
}, {
    id: 2,
    login: 'John Doe',
    email: 'Jhon@gmail.ru',
    passwordHash,
    salt,
    createdAt,
    updatedAt
}, {
    id: 3,
    login: 'Mike Mariny',
    email: 'Mike@gmail.ru',
    passwordHash,
    salt,
    createdAt,
    updatedAt
}];

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