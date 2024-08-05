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

  // Consulta SQL para recuperar score e IDs das palavras adivinhadas
  const query = `
    SELECT j.id AS jogador_id, j.nome, j.score, GROUP_CONCAT(p.id) AS palavras_adivinhadas
    FROM Jogadores j
    LEFT JOIN palavras_adivinhadas_por_jogador pa ON j.id = pa.id_jogador
    LEFT JOIN Palavras p ON pa.id_palavra = p.id
    WHERE j.nome = ?
    GROUP BY j.id, j.nome, j.score
  `;

  // Executar a consulta
  db.get(query, [playerName], (err, row) => {
    if (err) {
      console.error('Error retrieving player data:', err.message);
      callback(err, null);
      return;
    }

    // Verificar se o jogador foi encontrado
    if (row) {
      // Transformar a lista de IDs em um array
      const palavrasAdivinhadas = row.palavras_adivinhadas ? row.palavras_adivinhadas.split(',') : [];

      // Retornar os dados do jogador
      callback(null, {
        nome: row.nome,
        score: row.score,
        palavras_adivinhadas: palavrasAdivinhadas
      });
    } else {
      callback(null, null); // Jogador não encontrado
    }

    // Fechar a conexão com o banco de dados
    db.close((closeErr) => {
      if (closeErr) {
        console.error('Error closing the database:', closeErr.message);
      } else {
        console.log('Database connection closed.');
      }
    });
  });
};