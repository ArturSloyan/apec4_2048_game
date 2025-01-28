const express = require("express");
const path = require("path");
const { Client } = require("pg");
const config = require("./config.json");
const {
  saltHashPassword,
  comparePasswords,
} = require("./bcrypt-password-hash/passwordHashing.cjs");
const cors = require("cors");

const app = express();
const port = 3001;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// configure PostgreSQL connection
const dbConfig = {
  ...config.db,
  ssl: {
    rejectUnauthorized: false, // Allows self-signed certificates; recommended only for development
  },
};

// create PostgreSQL client
const client = new Client(dbConfig);

// create connection
client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

// route for login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required!" });
  }

  try {
    const query = `
            SELECT * FROM "User" WHERE EmailAddress = $1
        `;
    const result = await client.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = result.rows[0];

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.status(200).json({
      message: "Login successful!",
      userId: user.userid,
      username: user.username,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Failed to login.", error: error.message });
  }
});

// route for registration
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const checkQueryUsername = `
            SELECT * FROM "User" WHERE Username = $1
        `;
    const checkQueryEmail = `
            SELECT * FROM "User" WHERE EmailAddress = $1
        `;

    const existingUsername = await client.query(checkQueryUsername, [username]);
    const existingEmail = await client.query(checkQueryEmail, [email]);

    if (existingUsername.rows.length > 0) {
      return res.status(409).json({ message: "Username already exists." });
    }
    if (existingEmail.rows.length > 0) {
      return res
        .status(410)
        .json({ message: "E-Mail-Address already exists." });
    }

    const hashedPassword = await saltHashPassword(password);

    const query = `
            INSERT INTO "User" (Username, EmailAddress, Password)
            VALUES ($1, $2, $3) RETURNING UserId
        `;
    const values = [username, email, hashedPassword];

    const result = await client.query(query, values);
    res.status(201).json({
      message: "User registered successfully!",
      userId: result.rows[0].userid,
    });
  } catch (error) {
    console.error("Error while inserting user:", error.message);
    res
      .status(500)
      .json({ message: "Failed to register user.", error: error.message });
  }
});

// route to insert score
app.post("/score", async (req, res) => {
  const { score, username } = req.body;

  // check given parameter
  if (!score || !username) {
    return res
      .status(400)
      .json({ message: "Score and Username are required!" });
  }

  try {
    // get username id
    const checkQueryUsername = `
    SELECT * FROM "User" WHERE Username = $1
    `;

    const userByUsername = await client.query(checkQueryUsername, [username]);
    if (userByUsername.rows.length < 1) {
      return res.status(400).json({ message: "User was not found" });
    }

    // get current date
    // TODO somethings wrong with date
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // save score
    const query = `
            INSERT INTO "Scores" (Date, Score, UserId)
            VALUES ($1, $2, $3) RETURNING ScoreId
        `;

    const values = [date, score, userByUsername.rows[0].userid];

    const result = await client.query(query, values);
    res.status(201).json({
      message: "Score was successfully saved!",
      userId: result.rows[0].userid,
    });
  } catch (error) {
    console.error("Error while saving score:", error.message);
    res
      .status(500)
      .json({ message: "Failed to save a score.", error: error.message });
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    const result = await client.query(`
      SELECT 
        u.Username, 
        s.Score, 
        TO_CHAR(s.Date, 'YYYY-MM-DD"T00:00:00Z"') AS Date
      FROM 
        "Scores" s 
      JOIN 
        "User" u ON s.UserId = u.UserId 
      ORDER BY 
        s.Score DESC 
      LIMIT 10;
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).send("Server Error");
  }
});

// start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
