// метод проверки аутентификации при использовании cookie и сессий.
const passport = require('koa-passport');

function checkAuthByCookie() {
    return async (ctx, next) => {
        if (!ctx.isAuthenticated()) ctx.throw(401, 'Ошибка авторизации, Пожалуйста авторизируйтесь!');
        await next();
    }
}

module.exports = checkAuthByCookie;
