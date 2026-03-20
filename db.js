const sqlite3 = require('sqlite3').verbose(); // le verbose sert pour messages d'erreur plus verbeux
const path = require('path');

// evite les problemes windows/linux pour trouver le chemin de la bdd ( / ou \ )
const dbPath = path.join(__dirname, 'database/snake.db');

// initialise la connexion à la bdd sqlite. si la bdd n'existe pas, elle sera créée automatiquement
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur connexion SQLite :', err.message);
  } else {
    console.log('Connecté à SQLite');
    db.run('PRAGMA foreign_keys = ON');
  }
});

module.exports = db; // on exporte pour utiliser autre part