function sessionUseExample() {
    return async (ctx, next) => {
        let n = ctx.session.views || 0;
        ctx.session.views = ++n;

        let keys = [];
        let values = [];
        for (let key in ctx.session) {
            keys.push(key);
        }
        keys.forEach(key => values.push(`${key}: ${ctx.session[key]}\n\t`));

        console.info(`\n============\nsession keys: \n\t${keys}`);
        console.info(`\n============\nsession values: \n\t${values}`);

        await next();
    }
}

module.exports = sessionUseExample;