# snake-back

Backend du jeu Snake en Node.js.

## Installation

```bash
npm install
npm start
```

Le serveur démarre sur `http://localhost:3000` et crée automatiquement le fichier `snake.db`.

## Routes

| Méthode | Route | Description |
|---|---|---|
| POST | /api/scores | Sauvegarder un score |
| GET | /api/scores | Récupérer le top 10 |

### Exemple POST
```json
{ "player": "ALICE", "score": 12 }
```

## Stack
- Node.js
- Express
- SQLite3
