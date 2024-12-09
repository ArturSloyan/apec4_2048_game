const bcrypt = require('bcrypt');
const saltRounds = 10;

async function saltHashPassword(userPassword) {
    const salt = await bcrypt.genSalt(saltRounds); // generate salt
    const hashedPassword = await bcrypt.hash(userPassword, salt); // hash password
    return hashedPassword;
}

module.exports = { saltHashPassword }; // export, so it can be used in other documents
