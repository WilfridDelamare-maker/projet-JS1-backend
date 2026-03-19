const db = require('../db'); // cherche db.js pour la connexion à la bdd

exports.createUser = (req, res) => {
  const { username } = req.body;

  if (!username || username.trim() === '') { // vérifie que le username est présent et non vide
    return res.status(400).json({ // erreur400 bad request veut dire requete mal formée
      message: 'Le username est obligatoire'
    });
  }

  const trimmedUsername = username.trim(); // on supprime les espaces avant apres au cas ou

  const sql = `INSERT INTO users (username) VALUES (?)`; 
// on crée une variable pour la requete sql. on insere juste le username dans la table users

  db.run(sql, [trimmedUsername], function (err) { // trimmedUsername remplace le '?'
    // on utilise un callback parce que la requete sql est asynchrone. la fonction s'execute quand la requete est finie.
    if (err) {
      return res.status(400).json({
        message: 'Impossible de créer l\'utilisateur',
        error: err.message
      });
    }

    res.status(201).json({
      message: 'Utilisateur créé',
      userId: this.lastID,
      username: trimmedUsername
    });
  });
};

exports.getUsers = (req, res) => {
  const sql = `
    SELECT id, username, created_at
    FROM users
    ORDER BY created_at DESC
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: 'Erreur lors de la récupération des utilisateurs',
        error: err.message
      });
    }

    res.status(200).json(rows);
  });
};

exports.getUserById = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT id, username, created_at
    FROM users
    WHERE id = ?
  `;

  db.get(sql, [userId], (err, row) => {
    if (err) {
      return res.status(500).json({
        message: 'Erreur lors de la récupération de l\'utilisateur',
        error: err.message
      });
    }

    if (!row) {
      return res.status(404).json({
        message: 'Utilisateur introuvable'
      });
    }

    res.status(200).json(row);
  });
};