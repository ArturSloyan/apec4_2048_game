const bcrypt = require('bcrypt');
const saltRounds = 10;

export function saltHashPassword (userPassword) {
    const salt = bcrypt.genSalt(saltRounds);
    bcrypt.hash(userPassword, salt);
}