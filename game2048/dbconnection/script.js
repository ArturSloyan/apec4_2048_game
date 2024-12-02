const express = require('express'); const { Pool } = require('pg'); const path = require('path'); const bodyParser = require('body-parser');
const app = express(); const port = 3000;
const pool = new Pool({ user: 'postgres', host: 'localhost', database: 'userscoresmanagerdb', password: '4fortnite' });

app.use(express.static(path.join('')));
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, '', 'dbdisplayer.html')); });
app.get('/user', (req, res) => { const query = 'SELECT * FROM "User";'; pool.query(query, (error, result) => { if (error) { console.error('Error occurred:', error); res.status(500).send('An error occurred while retrieving data from the database.'); } else { const user = result.rows; res.json(user); } }); });
app.listen(port, () => { console.log(`Server listening on port ${port}`); });

