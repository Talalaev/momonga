/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       id:
 *         type: integer
 *       login:
 *         type: string
 *       email:
 *         type: string
 *       isAdmin:
 *          type: integer
 *       currencyID:
 *         type: integer
 *       countryID:
 *         type: integer
 *       city:
 *         type: string
 *       language:
 *         type: string
 *       autoChangeLanguage:
 *         type: integer
 *       passwordHash:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 */
const crypto = require('crypto');
const config = require('config');
const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');
const avaliableLanguages = require('../locales/avaliableLanguages');

let
    model = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: Sequelize.STRING,
            validate: {
                is: {
                    args: /^.{4}/,
                    msg: 'Минимальная длинна для логина 4 символов!'
                }
            }
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: {
                    msg: 'Укажите, пожалуйста, корректный email!'
                }
            }
        },
        isAdmin: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        currencyID: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        countryID: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        city: {
            type: Sequelize.STRING,
            is: {
                args: /^.{2}/,
                msg: 'Минимальная длинна для города 2 символа!'
            }
        },
        language: {
            type: Sequelize.STRING,
            validate: {
                checkLanguage(value) {
                    if (!~avaliableLanguages.indexOf(value)) {
                        throw new Error('Язык не поддерживается!');
                    }
                }
            }
        },
        autoChangeLanguage: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        passwordHash: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    },
    options = {
        getterMethods: {
            password() {
                return this._plainPassword;
            }
        },
        setterMethods: {
            password(password) {
                if (password !== undefined) {
                    if (password.length < 6) {
                        throw new Error('Минимальная длинна паролья 6 символов!');
                    }
                }

                this._plainPassword = password;

                this.salt = crypto.randomBytes(config.crypto.hash.length).toString('base64');
                this.passwordHash = crypto.pbkdf2Sync(
                    password,
                    this.salt,
                    config.crypto.hash.iterations,
                    config.crypto.hash.length,
                    'sha512'
                ).toString('hex');
            }
        }
    };

const User = sequelize.define('user', model, options);
User.prototype.checkPassword = function(password) {
    if (!password) return false; // empty password means no login by password
    if (!this.passwordHash) return false; // this user does not have password (the line below would hang!)

    let passwodHash = crypto.pbkdf2Sync(
        password,
        this.salt,
        config.crypto.hash.iterations,
        config.crypto.hash.length,
        'sha512'
    ).toString('hex');

    return passwodHash == this.passwordHash;
};
User.prototype.toJson = function() {
    let user = this.get();
    delete user.passwordHash;
    delete user.salt;

    return user;
};

module.exports = User;
