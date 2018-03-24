export default {
    login: {
        required: "Login is required",
        minlength: "Min length is 4 symbol",
        maxlenght: "Max length is 16 symbol",
        taken: "This username is taken",
        error: "Validation error"
    },
    email: {
        required: "E-mail is required",
        pattern: "E-mail don't equal pattern",
        error: "Validation error"
    },
    password: {
        required: "Password is required",
        minlength: "Min length is 4 symbol",
        maxlenght: "Max length is 24 symbol",
        error: "Validation error"
    },
    repeatPassword: {
        required: "Repeat password is required",
        minlength: "Min length is 4 symbol",
        maxlenght: "Max length is 24 symbol",
        passwordsnotequal: "Repeat password don't equal password",
        error: "Validation error"
    }
};