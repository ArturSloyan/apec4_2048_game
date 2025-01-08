const bcrypt = require('bcrypt');
const saltRounds = 10;

async function saltHashPassword(userPassword) {
    const salt = await bcrypt.genSalt(saltRounds); // generate salt
    const hashedPassword = await bcrypt.hash(userPassword, salt); // hash password
    return hashedPassword;
}

// storedHashedPassword represents the hashed password retrieved from database
// userInputPasswort is the plaintext password provided by the user during login
// the bcrypt.compare() function compares these two passwords and returns a boolean value indicating wheter they match
async function comparePasswords(userInputPassword, storedHashedPassword) {
    try {
        const result = await bcrypt.compare(userInputPassword, storedHashedPassword);
        return result; // true or false
    } catch (err) {
        console.error('Error while comparing passwords:', err);
        throw err; 
    }
}

// export, so it can be used in other documents
module.exports = { saltHashPassword, comparePasswords };