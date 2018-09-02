const User = require('../models/user');

function returnApp() {
    return async (ctx, next) => {
        let user = null;

        if (ctx.session.passport) {
            user = await User.findOne({where: {id: ctx.session.passport.user}});

            if (user) {
                console.log('\x1b[32m%s\x1b[0m', "---------\nIs the user authorized? -> true\n---------");
            } else {
                console.log('\x1b[33m%s\x1b[0m:', `---------\nIs the user authorized? -> false\n---------`);
            }
        }

        try {
            await ctx.render('client/pwa/dist/index.html');
        } catch(e) {
            ctx.body = 'Page not found: ' + e;
        }

        next();
    };
}

module.exports = returnApp;