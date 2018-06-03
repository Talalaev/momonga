const Category = require('./category');
const Country = require('./country');
const Group = require('./group');
const Invitation = require('./invitation');
const Purchase = require('./purchase');
const User = require('./user');

User.belongsToMany(Group, {through: 'users_groups'});
Group.belongsToMany(User, {through: 'users_groups'});

exports.models = {
    Category,
    Country,
    Group,
    Invitation,
    Purchase,
    User
};