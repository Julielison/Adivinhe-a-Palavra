import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Caminho para o banco de dados
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, './data.db');

// Função para recuperar palavras excluindo IDs
export const getUnsortedWords = (excludeIds, callback) => {
  // Criar uma instância do banco de dados
  const db = new sqlite3.Database(dbPath);

  // Formatar a consulta SQL
  const query = `SELECT * FROM Palavras WHERE id NOT IN (${excludeIds.join(',')})`;

  // Executar a consulta
  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error executing SQL query:', err.message);
      callback(err, null);
      return;
    }
    callback(null, rows);

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