function allowHosts() {
    return (ctx, next) => {
        ctx.response.set("Access-Control-Allow-Origin", "http://localhost:3000");
        ctx.response.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        ctx.response.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
        ctx.response.set("Access-Control-Allow-Credentials", "true");

        return next();
    };
}

module.exports = allowHosts;