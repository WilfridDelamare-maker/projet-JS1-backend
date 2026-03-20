const express = require('express');
const router = express.Router(); // on crée un routeur express pour gérer les routes liées aux parties
const {
  createGame,
  getLeaderboard,
  getUserGames,
  getGameById
} = require('../controllers/gameController');

router.post('/', createGame);
router.get('/leaderboard', getLeaderboard);
router.get('/user/:userId', getUserGames);
router.get('/:gameId', getGameById);

module.exports = router; // on exporte le routeur pour pouvoir l'utiliser dans app.js