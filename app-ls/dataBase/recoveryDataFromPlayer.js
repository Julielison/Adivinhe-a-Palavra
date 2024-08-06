import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Caminho para o banco de dados
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'data.db');

// Função para recuperar dados do jogador
export const getPlayerDataByName = (playerName, callback) => {
  // Criar uma instância do banco de dados
  const db = new sqlite3.Database(dbPath);

  // Primeira consulta: Recuperar score do jogador
  const scoreQuery = `
    SELECT id AS jogador_id, nome, score
    FROM Jogadores
    WHERE nome = ?
  `;

  db.get(scoreQuery, [playerName], (err, row) => {
    if (err) {
      console.error('Error retrieving player score:', err.message);
      callback(err, null);
      return;
    }

    // Verificar se o jogador foi encontrado
    if (row) {
      const playerData = {
        nome: row.nome,
        score: row.score,
        palavras_adivinhadas: []
      };

      // Segunda consulta: Recuperar IDs das palavras adivinhadas pelo jogador
      const wordsQuery = `
        SELECT id_palavra
        FROM palavras_adivinhadas_por_jogador
        WHERE id_jogador = ?
      `;

      db.all(wordsQuery, [row.jogador_id], (err, rows) => {
        if (err) {
          console.error('Error retrieving guessed words:', err.message);
          callback(err, null);
          return;
        }

        // Transformar a lista de IDs em um array
        playerData.palavras_adivinhadas = rows.map(row => row.id_palavra);

        // Retornar os dados do jogador
        callback(null, playerData);

        // Fechar a conexão com o banco de dados
        db.close((closeErr) => {
          if (closeErr) {
            console.error('Error closing the database:', closeErr.message);
          } else {
            console.log('Database connection closed.');
          }
        });
      });
    } else {
      callback(null, null); // Jogador não encontrado

      // Fechar a conexão com o banco de dados
      db.close((closeErr) => {
        if (closeErr) {
          console.error('Error closing the database:', closeErr.message);
        } else {
          console.log('Database connection closed.');
        }
      });
    }
  });
};