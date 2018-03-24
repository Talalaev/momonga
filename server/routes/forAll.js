const Router = require("koa-router");
const forAll = new Router();
const locales = require('config').locales;

forAll
    .get("/", async (ctx, next) => {
        try {
            await ctx.render('assets/pages/main/index.pug', {
                appName: "Momo San",
                locales: locales,
                lang: ctx.i18n.getLocale()
            });
        } catch(err) {
            // возможно путь к станице не коректный. обработать ошибку.
            ctx.body = 'server error ' + err;
        }
    });

module.exports = forAll;