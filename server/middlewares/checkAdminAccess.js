/**
 * @desc - Разрешает выполнять операцию только администратору.
 * */
const passport = require('koa-passport');

function checkAdminAccess() {
    return async (ctx, next) => {
        ctx.assert(ctx.user.isAdmin, 403, 'Ошибка доступа, Запрет на выполнение операции!');
        await next();
    }
}

module.exports = checkAdminAccess;
