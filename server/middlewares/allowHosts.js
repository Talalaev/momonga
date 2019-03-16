var fs = require('fs');

function allowHosts() {
    return (ctx, next) => {

      if (process.env.DYNO) {
        console.log('This is on Heroku..!!');
        fs.openSync('/tmp/app-initialized', 'w');
      }
      console.log('Node app is running on port', 8888);


        ctx.response.set("Access-Control-Allow-Origin", "http://localhost:3000");
        ctx.response.set("Access-Control-Allow-Origin", "http://localhost:4200");
        ctx.response.set("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        ctx.response.set("Access-Control-Allow-Headers", "Content-Type,Authorization");
        ctx.response.set("Access-Control-Allow-Credentials", "true");

        return next();
    };
}

module.exports = allowHosts;