import express from 'express';
import DataBase from './classes/dataBase.js';

const app = express();
const PORT = 3000;

app.use(express.static('public')); // Para servir arquivos estáticos, como index.html

app.get('/api/top-players', async (req, res) => {
    const db = new DataBase();
    try {
        const topPlayers = await db.getTopPlayers();
        res.json(topPlayers);
    } catch (err) {
        console.error('Error retrieving top players:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await db.close();
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});