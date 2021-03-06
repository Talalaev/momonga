const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('config');

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: "Имя пользователя отсутствует."
    },
    email: {
        type: String,
        unique: true,
        required: "E-mail пользователя не должен быть пустым.",
        validate: [{
            validator: function checkEmail(value) {
                return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
            },
            msg: 'Укажите, пожалуйста, корректный email.'
        }]
    },
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

userSchema.virtual('password')
    .set(function(password) {
        if (password !== undefined) {
            if (password.length < 4) {
                this.invalidate('password', 'Пароль должен быть минимум 4 символа.');
            }
        }

        this._plainPassword = password;

        this.salt = crypto.randomBytes(config.crypto.hash.length).toString('base64');
        this.passwordHash = crypto.pbkdf2Sync(
            password,
            this.salt,
            config.crypto.hash.iterations,
            config.crypto.hash.length
        );
    })
    .get(function() {
        return this._plainPassword;
    });

userSchema.methods.checkPassword = function(password) {
    if (!password) return false; // empty password means no login by password
    if (!this.passwordHash) return false; // this user does not have password (the line below would hang!)

    let passwodHash = crypto.pbkdf2Sync(
        password,
        this.salt,
        config.crypto.hash.iterations,
        config.crypto.hash.length
    );

    return passwodHash == this.passwordHash;
};

module.exports = mongoose.model('User', userSchema);


// const mongoose = require("mongoose");
//
// let buyingSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     created: {
//         type: Date,
//         default: Date.now
//     },
//     buyer: {
//         type: mongoose.Schema.Types.ObjectId
//     }
// });
//
// module.exports = mongoose.model('Buying', buyingSchema);
