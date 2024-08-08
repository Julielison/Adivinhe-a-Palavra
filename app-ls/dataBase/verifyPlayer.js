import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Caminho para o banco de dados
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, './data.db');

// Função para verificar se o usuário está no banco de dados
export const userExists = (userName, callback) => {
  // Criar uma instância do banco de dados
  const db = new sqlite3.Database(dbPath);

  // Consulta SQL para verificar se o usuário existe
  const query = `SELECT COUNT(*) AS count FROM Jogadores WHERE nome = ?`;

  // Executar a consulta
  db.get(query, [userName], (err, row) => {
    if (err) {
      console.error('Error executing SQL query:', err.message);
      callback(err, false);
      return;
    }

    // Verificar se o usuário existe
    const exists = row.count > 0;
    callback(null, exists);

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
