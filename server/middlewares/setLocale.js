const config = require('config');

function setLocale() {
    return (ctx, next) => {
        let lang = ctx.request.query.lang ? ctx.request.query.lang : config.defaultLang;

        if (~config.locales.indexOf(lang)) {
            ctx.i18n.setLocale(lang);
        }

        return next();
    };
}

module.exports = setLocale;