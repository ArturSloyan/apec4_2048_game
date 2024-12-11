const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

// PostgreSQL-Verbindung konfigurieren
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'userscoresmanagerdb',
    password: 'IhASub20Ja',
    port: 5432,
});

// Verbindung herstellen
pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route für die Registrierung
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    try {
        const query = `
            INSERT INTO "User" (Username, EmailAddress, Password)
            VALUES ($1, $2, $3) RETURNING UserId
        `;
        const values = [username, email, password];

        const result = await pool.query(query, values);
        res.status(201).json({ message: 'User registered successfully!', userId: result.rows[0].userid });
    } catch (error) {
        console.error('Error while inserting user:', error.message);
        res.status(500).json({ message: 'Failed to register user.', error: error.message });
    }
});

// /// TODO error getting the username and password, user credentials, token JWT

app.use(cors());

app.post('/login', async (req, res) => {

    const { username, password } = req.body;

    // Validate inputs
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    console.log("input valid")
    // Query to check for username and password
    const query = 'SELECT * FROM Users WHERE username = $1 AND password = $2';
    await pool.query(query, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }

        if (result.rows.length > 0) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});

app.listen(3001, () => console.log(`API is running on http://localhost:3001/login`));