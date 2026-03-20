const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const db = new sqlite3.Database("snake.db");

// Middleware
app.use(cors());
app.use(express.json());

// Création de la table si elle n'existe pas
db.run(`
    CREATE TABLE IF NOT EXISTS scores (
        id      INTEGER PRIMARY KEY AUTOINCREMENT,
        player  TEXT    NOT NULL,
        score   INTEGER NOT NULL,
        date    DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// POST /api/scores — sauvegarder un score
app.post("/api/scores", (req, res) => {
    const { player, score } = req.body;

    if (!player || score === undefined) {
        return res.status(400).json({ error: "Champs 'player' et 'score' requis" });
    }

    db.run("INSERT INTO scores (player, score) VALUES (?, ?)", [player, score], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, player, score });
    });
});

// GET /api/scores — récupérer le classement
app.get("/api/scores", (req, res) => {
    db.all("SELECT player, score, date FROM scores ORDER BY score DESC LIMIT 10", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Lancement du serveur
app.listen(3000, () => {
    console.log("Backend démarré sur http://localhost:3000");
});