module.exports = function(app) {
    app.use(async (ctx, next) => {
        let res;
        try {
            await next();
        } catch (err) {
            ctx.status = err.status || 500;
            if (process.env.NODE_ENV === 'production') {
                res = {
                    name: err.name,
                    message: err.message
                };
            } else {
                res = {
                    name: err.name,
                    message: err.message,
                    cause: err.cause,
                    stack: err.stack
                };
            }
            ctx.body = res;
            ctx.app.emit('error', err, ctx);
        }
    });

    app.on('error', async (err, ctx) => {
        if (err.status < 500) return;

        console.error(`Server error:\n- ${err.stack}`);
    });
};