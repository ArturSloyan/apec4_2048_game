const express = require('express');
const path = require('path');
const { Client } = require('pg');
const config = require('./config.json');
const { saltHashPassword, comparePasswords } = require('./bcrypt-password-hash/passwordHashing');

const app = express();
const port = 3001;

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// configure PostgreSQL connection
const client = new Client(config.db);

// create connection
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));


// route for login
app.post('/login', async (req, res) => {
    const { username, password } = req.body; // User-Eingaben

    try {
        // find user based on their username
        const query = 'SELECT * FROM "User" WHERE Username = $1';
        const result = await client.query(query, [username]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const user = result.rows[0]; // user data from db
        const storedHashedPassword = user.password; // hashed password from db

        // compare passwords
        const isMatch = await comparePasswords(password, storedHashedPassword);

        if (isMatch) {
            res.status(200).json({ message: 'Login successfull!' });
        } else {
            res.status(401).json({ message: 'Password is wrong.' });
        }
    } catch (error) {
        console.error('Failed to Login:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// route for registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
        // check if username or email already exist
        const checkQueryUsername = `
            SELECT * FROM "User" WHERE Username = $1
        `;

        const checkQueryEmail =  `
            SELECT * FROM "User" WHERE EmailAddress = $1
        `;

        const existingUsername = await client.query(checkQueryUsername, [username]);
        const existingEmail = await client.query(checkQueryEmail, [email]);

        if (existingUsername.rows.length > 0){
            return res.status(409).json({ message: 'Username already exists.' });
        }
        if (existingEmail.rows.length > 0) {
            return res.status(410).json({ message: 'E-Mail-Address already exists.' });
        }

        // hash password to save in db
        const hashedPassword = await saltHashPassword(password);

        const query = `
            INSERT INTO "User" (Username, EmailAddress, Password)
            VALUES ($1, $2, $3) RETURNING UserId
        `;
        const values = [username, email, hashedPassword];

        const result = await client.query(query, values);
        res.status(201).json({ message: 'User registered successfully!', userId: result.rows[0].userid });
    } catch (error) {
        console.error('Error while inserting user:', error.message);
        res.status(500).json({ message: 'Failed to register user.', error: error.message });
    }
});

// start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
