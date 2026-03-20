const express = require('express');
const router = express.Router(); // on crée un routeur express pour gérer les routes liées aux utilisateurs
const { createUser, getUsers, getUserById } = require('../controllers/userController');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);

module.exports = router; // on exporte le routeur pour pouvoir l'utiliser dans app.js