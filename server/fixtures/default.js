const chance = new (require('chance').Chance);
const moment = require('moment');
const // password: 123456
    passwordHash = 'd4f467a4e294181d6f1b23e9ffd2944a28fa31001a87d4a7867c02bedaf5480fd63a333dfa71a7df716e39d087b6a5a2af896da8876843400facbfcbea113a26442ea1d6de0f7fa3f6228c5ddd4e339a5756c21325392fab57b71611958ec7a81c9a8c661ea5163d37ca13e35a26125a8071c75d29d27f27fe18727646e09bc3',
    salt = 'hRkoQBgpTpGCxYslSXgRybqCaIBuqg8xQwXRp/mzw1Q64QP63kbW12UhIc5fF0NsOuxNIpdivO7q7Y4WQub+zOzmOEf76uIFhJAd/VQDIGDHBNLqJ6VmyxPOO4ffX5394JvLtYnyNDNZGKMxDcwTdpISq73/Q0qWHXRmqHamymM=',
    createdAt = new Date,
    updatedAt = new Date,
    oid = require('../libs/db/oid');
let purchaseID = 1;

// У нас будет 100 пользователей
// У каждого пользователя будет 10 покупок на последние 10 дней. Всего за период неделя.
// Будет группа семья в которой будут состоять 3 пользователя
// И будет группа Пикник в которой будут состоять два человека и еще 3 будут приглашены в нее
// Будет три приглашения в группу Пикник для 3 пользователей

function generateUsers(count = 100) {
    let users = [];

    for (let id = 1; id <= count; id++) {
        if (id === 1) {
            users.push({
                id,
                login: 'momo',
                email: 'momo@momonga.ru',
                passwordHash,
                salt,
                createdAt: new Date('2018-04-08 12:15:28'),
                updatedAt
            });
            continue;
        }

        let login = chance.word(), email = chance.email({domain: "yandex.ru"});
        users.push({ id, login, email, passwordHash, salt, createdAt, updatedAt });
    }

    return users;
}

function generatePurchase(usersID) {
    let purchase = [];

    for (let userID of usersID) {
        for (let i = 1; i <= 8; i++) {
            purchase = [...purchase, ...generatePurchaseForUser(userID, moment().subtract(i, 'days').format("YYYY-MM-DD HH-mm-ss"))];
        }
    }

    return purchase;
}

function generatePurchaseForUser(userID, date, count = 10) {
    let
        purchaseForUser = [],
        categoryID = 1,
        currencyID = 1,
        countryID = 112,
        city = 'Луганск',
        name = 'Название покупки',
        price = chance.integer({ min: 100, max: 10000 }),
        createdAt = date,
        updatedAt = date;

    for (let id = 1; id <= count; id++) {
        purchaseForUser.push({ id: purchaseID++,  userID, categoryID, currencyID, countryID, city, name, price, createdAt, updatedAt });
    }

    return purchaseForUser;
}
/**
 * Пока мы сделаем 6 базовых категорий. Эти 6 категорий являются базой(ядром) и каждый пользователь может создавать
 * свои дополнительные категории. Нужно подумать над идеей разные типы пользователей и для каждого типа должно быть
 * свое ядро категорий. Студенты и моложые люди имеют одно ядро, путешественики другое, а домоседы третье и люди за 40
 * с взрослыми детьми четвертое. Возможно каждый должен иметь возможность самостоятельно настоить свое ядро. Но ядро
 * это самые употребляемые категории.
 *
 * еда
 * хоз. товары
 * строй материалы
 * услуги
 * развлечения
 * комунальные платежи,
 * для женщин
 * для мужчин
 * для детей
 * прочее
 * */

function generateCategory(categoryNames, ownersID) {
    let category = [];

    for (let ownerID of ownersID) {
        category = [...category, ...generateCategoryForUser(categoryNames, ownerID)];
    }

    return category;
}

function generateCategoryForUser(categoryNames, ownerID) {
    let lenght = categoryNames.length;
    let category = [];
    for (let i = 0; i < lenght; i++) {
        let id = categoryNames[i].id;
        let name = categoryNames[i].name;
        category.push({ id, name, ownerID, createdAt, updatedAt });
    }

    return category;
}

function getDefaultCategories() {
    return [
        { id: 1, name: 'еда'},
        { id: 2, name: 'хоз. товары'},
        { id: 3, name: 'строй материалы'},
        { id: 4, name: 'услуги'},
        { id: 5, name: 'развлечения'},
        { id: 6, name: 'комунальные платежи'},
        { id: 7, name: 'для женщин'},
        { id: 8, name: 'для мужчин'},
        { id: 9, name: 'для детей'},
        { id: 10, name: 'прочее'}
    ];
}

const groups =  [
    {
        id: 1,
        name: 'семья',
        ownerID: 1,
        description: 'Семейка Адамсов',
        createdAt,
        updatedAt
    },
    {
        id: 2,
        name: 'пикник',
        ownerID: 2,
        description: 'Идем жарить шашлычки',
        createdAt,
        updatedAt
    }
];
const invitations = [
    {
        id: 1,
        userID: 1,
        groupID: 2,
        createdAt,
        updatedAt
    },
    {
        id: 2,
        userID: 2,
        groupID: 2,
        createdAt,
        updatedAt
    },
    {
        id: 3,
        userID: 3,
        groupID: 2,
        createdAt,
        updatedAt
    }
];

try {
    exports.users = generateUsers();
    exports.categories = generateCategory(getDefaultCategories(), [0]);
    exports.purchases = generatePurchase(generateUsers().map(user => user.id));
    exports.groups = groups;
    exports.invitations = invitations;
} catch(e) {
    console.log(e);
}
