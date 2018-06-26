const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


passport.serializeUser((user, done) => {
    done(null, user.id); // uses id as idField
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            // устанавливает значение в объект ctx.state.user
            done(null, user.get());
        })
        .catch(e => done(null, null));
});

// done(null, user)
// OR
// done(null, false, { message: <error message> })  <- 3rd arg format is from built-in messages of strategies
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User
            .findOne({where: { email: email }})
            .then(user => {
                if (!user || !user.checkPassword(password)) {
                    // don't say whether the user exists
                    return done(null, false, { message: 'Нет такого пользователя или пароль неверен!' });
                }

                return done(null, user.toJson(), { message: 'Успешно!' });
            })
            .catch(err => done(err));
    }
));

const passportInitialize = passport.initialize();

module.exports = function() {
    return passport.initialize();
};