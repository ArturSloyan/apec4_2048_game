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
const userInputPassword = '';
const storedHashedPassword = '';
bcrypt.compare(userInputPassword, storedHashedPassword, (err, result) => {
    if (err) {
        // Handle error
        console.error('Error comparing passwords:', err);
        return;
    }

if (result) {
    // Passwords match, authentication successful
    console.log('Passwords match! User authenticated.');
} else {
    // Passwords don't match, authentication failed
    console.log('Passwords do not match! Authentication failed.');
}
});

// export, so it can be used in other documents
module.exports = { saltHashPassword };