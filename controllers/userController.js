const db = require('../db');

exports.createUser = (req, res) => {
  const { username } = req.body;

  if (!username || username.trim() === '') {
    return res.status(400).json({
      message: 'Le username est obligatoire'
    });
  }

  const trimmedUsername = username.trim();

  const sql = `INSERT INTO users (username) VALUES (?)`;

  db.run(sql, [trimmedUsername], function (err) {
    if (err) {
      return res.status(400).json({
        message: 'Impossible de créer l’utilisateur',
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