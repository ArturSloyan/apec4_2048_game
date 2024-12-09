const express = require('express');
const path = require('path');
const { Client } = require('pg');
const cors = require('cors');

// allows front-end to communicate with server
app.use(cors());

const app = express();
const port = 3001;

// PostgreSQL-Verbindung konfigurieren
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'userscoresmanagerdb',
    password: '4fortnite',
    port: 5432,
});

// create connection
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// route for registration
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
