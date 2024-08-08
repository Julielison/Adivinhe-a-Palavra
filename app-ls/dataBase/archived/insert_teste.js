import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Caminho para o banco de dados
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'data.db');

// Criação e configuração do banco de dados
const db = new sqlite3.Database(dbPath);

// Função para inserir palavras adivinhadas
const insertAdivinhadas = () => {
  const query = `
    INSERT INTO Guessed_Words (id_player, id_word) VALUES
    (1, 1),  
    (1, 3),
    (1, 5),
    (1, 7);

    INSERT INTO Guessed_Words (id_player, id_word) VALUES
    (2, 2),
    (2, 4),
    (2, 6),
    (2, 8);
  `;

  db.exec(query, (err) => {
    if (err) {
      console.error('Error inserting data:', err.message);
    } else {
      console.log('Data inserted successfully into Guessed_Words.');
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

// Executar a inserção
insertAdivinhadas();