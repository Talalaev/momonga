/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       id:
 *         type: integer
 *       login:
 *         type: integer
 *       email:
 *         type: string
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
 */
const crypto = require('crypto');
const config = require('config');
const Sequelize = require('sequelize');
const sequelize = require('../libs/sequelize');

let
    model = {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        login: {
            type: Sequelize.STRING,
            required: "Имя пользователя отсутствует."
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            required: "E-mail пользователя не должен быть пустым.",
            validate: {
                isEmail: {
                    msg: 'Укажите, пожалуйста, корректный email.'
                },
                checkEmail(value) {
                    if (!~/^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value)) {
                        throw new Error('Укажите, пожалуйста, корректный email.');
                    }
                }
            }
        },
        currencyID: {
            type: Sequelize.INTEGER,
            required: true
        },
        countryID: {
            type: Sequelize.INTEGER,
            required: true
        },
        city: {
            type: Sequelize.STRING,
            required: true
        },
        language: {
            type: Sequelize.STRING,
            required: true
        },
        autoChangeLanguage: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            required: true
        },
        passwordHash: {
            type: Sequelize.STRING,
            required: true
        },
        salt: {
            type: Sequelize.STRING,
            required: true
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

module.exports = User;
