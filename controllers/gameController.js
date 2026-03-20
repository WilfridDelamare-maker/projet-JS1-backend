const db = require('../db'); //cherche la connexion à la bdd

// fonction pour créer une partie. on prend les données du front (req.body) et on les insère dans la table games de la bdd
exports.createGame = (req, res) => {
  const { user_id, score, duration_seconds } = req.body;

  if (!user_id || score == null || duration_seconds == null) { // on verifie que les données ne sont pas absentes
    return res.status(400).json({
      message: 'user_id, score et duration_seconds sont obligatoires'
    });
  }

  const sql = `
    INSERT INTO games (user_id, score, duration_seconds)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [user_id, score, duration_seconds], function (err) {
    if (err) {
      return res.status(400).json({
        message: 'Impossible d\'enregistrer la partie',
        error: err.message
      });
    }

    res.status(201).json({
      message: 'Partie enregistrée',
      gameId: this.lastID,
      user_id,
      score,
      duration_seconds
    });
  });
};

// fonction pour recuperer le classement des 10 meilleurs scores. 
exports.getLeaderboard = (req, res) => {
  const sql = `
    SELECT 
      u.id AS user_id,
      u.username,
      MAX(g.score) AS best_score
    FROM games g
    JOIN users u ON g.user_id = u.id
    GROUP BY u.id, u.username
    ORDER BY best_score DESC
    LIMIT 10
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: 'Erreur lors de la récupération du classement',
        error: err.message
      });
    }

    res.status(200).json(rows);
  });
};

// fonction pour récupérer l'historique des parties d'un utilisateur. on prend l'id de l'utilisateur dans les paramètres de l'url (req.params) et on cherche dans la table games de la bdd toutes les parties qui ont cet user_id
exports.getUserGames = (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT id, user_id, score, duration_seconds, created_at
    FROM games
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.all(sql, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: 'Erreur lors de la récupération des parties',
        error: err.message
      });
    }

    res.status(200).json(rows);
  });
};

// fonction pour récupérer une partie par son id. on prend l'id de la partie dans les paramètres de l'url (req.params) et on cherche dans la table games de la bdd la partie qui a cet id
exports.getGameById = (req, res) => {
  const { gameId } = req.params;

  const sql = `
    SELECT id, user_id, score, duration_seconds, created_at
    FROM games
    WHERE id = ?
  `;

  db.get(sql, [gameId], (err, row) => {
    if (err) {
      return res.status(500).json({
        message: 'Erreur lors de la récupération de la partie',
        error: err.message
      });
    }

    if (!row) {
      return res.status(404).json({
        message: 'Partie introuvable'
      });
    }

    res.status(200).json(row);
  });
};