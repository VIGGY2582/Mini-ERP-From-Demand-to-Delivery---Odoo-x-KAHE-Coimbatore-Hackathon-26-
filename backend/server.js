const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Mini ERP Backend Running");
});

// Get All Users
app.get("/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, username, role FROM users");
        res.json(result.rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1 AND password = $2",
            [username, password]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid Username or Password"
            });
        }

        const user = result.rows[0];
        res.json({
            success: true,
            id: user.id,
            username: user.username,
            role: user.role
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// 🆕 Signup Route (Enforces min-lengths and assigns the 'user' role automatically)
app.post("/signup", async (req, res) => {
    const { username, password } = req.body;

    // 1. Validation constraints
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Please fill in all fields." });
    }
    if (username.length < 3) {
        return res.status(400).json({ success: false, message: "Username must be at least 3 characters long." });
    }
    if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });
    }

    try {
        // 2. Conflict check (Avoid duplicate usernames)
        const checkUser = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (checkUser.rows.length > 0) {
            return res.status(409).json({ success: false, message: "Username is already taken." });
        }

        // 3. Write user profile to database table securely forcing role as 'user'
        const result = await pool.query(
            "INSERT INTO users (username, password, role) VALUES ($1, $2, 'user') RETURNING id, username, role",
            [username, password]
        );

        res.status(201).json({
            success: true,
            message: "Registration successful!",
            user: result.rows[0]
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server database configuration registration error." });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});