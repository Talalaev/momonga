module.exports = function(ctx) {
    if (!ctx.isAuthenticated()) ctx.throw(401, 'Ошибка авторизации, Пожалуйста авторизируйтесь!');
};