// проверка авторизованности пользователя по токену
const passport = require('koa-passport');
const User = require('../models/user');

function checkAuthByToken() {
    return async (ctx, next) => {
        await passport.authenticate('jwt', async function (err, user, payload) {
            if (err) ctx.throw(422, err, {cause: {...err}});

            ctx.assert(user, 401, payload.message);
            let userFromDb = await User.findById(user.id);
            ctx.assert(user, 404, 'Пользователь не существует!');

            ctx.user = userFromDb.toJson();
        })(ctx, next);

        await next();
    }
}

module.exports = checkAuthByToken;
