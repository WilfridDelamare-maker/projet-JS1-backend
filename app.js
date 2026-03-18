const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express(); // avoir package express

app.use(cors()); // permet au serveur d’accepter les requêtes du front
app.use(express.json()); // convertit automatiquement les requêtes en JSON

app.get('/', (req, res) => {
  res.json({ message: 'API Snake OK' }); // route pour tester que l’API fonctionne
});

app.use('/api/users', userRoutes); // routes pour les utilisateurs (création, liste)
app.use('/api/games', gameRoutes); // routes pour les parties (création, leaderboard, historique d’un utilisateur)

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
}); // lance le serveur et console.log 