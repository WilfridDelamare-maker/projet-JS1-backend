const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// chemin vers la bdd
const dbPath = path.join(__dirname, 'database/snake.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur connexion SQLite :', err.message);
  } else {
    console.log('Connecté à SQLite');
    db.run('PRAGMA foreign_keys = ON');
  }
});

module.exports = db;