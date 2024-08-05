import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Caminho para o banco de dados
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'data.db');

// Função para salvar o nome do jogador
export const saveNamePlayer = (playerName) => {
  // Criar uma instância do banco de dados
  const db = new sqlite3.Database(dbPath);

  // Inserir o nome do jogador na tabela Jogadores
  db.run("INSERT INTO Jogadores (nome) VALUES (?)", [playerName], function(err) {
    if (err) {
      console.error('Error inserting player name:', err.message);
    } else {
      console.log(`Player name '${playerName}' inserted successfully with ID ${this.lastID}.`);
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
