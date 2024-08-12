import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

async function getTopPlayers() {
    // Caminho para o banco de dados
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dbPath = path.join(__dirname, '../classes/data.db');

    // Abra a conexão com o banco de dados
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    const query = `
        SELECT name, score
        FROM Players
        ORDER BY score DESC
        LIMIT 10
    `;

    try {
        const topPlayers = await db.all(query);
        return topPlayers;
    } catch (err) {
        console.error('Error executing SQL query:', err.message);
        throw err;
    } finally {
        // Feche a conexão com o banco de dados
        await db.close();
        console.log('Database connection closed.');
    }
}

// // Exemplo de como usar a função e exibir o resultado
// getTopPlayers().then(players => {
//     console.log(players);
// }).catch(err => {
//     console.error('Failed to get top players:', err.message);
// });

export default getTopPlayers;