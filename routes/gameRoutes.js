const express = require('express');
const router = express.Router();
const {
  createGame,
  getLeaderboard,
  getUserGames
} = require('../controllers/gameController');

router.post('/', createGame);
router.get('/leaderboard', getLeaderboard);
router.get('/user/:userId', getUserGames);

module.exports = router;