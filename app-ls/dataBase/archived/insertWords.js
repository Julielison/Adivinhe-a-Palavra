import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Caminho para o banco de dados
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, './data.db');

// Caminho para o arquivo SQL com as inserções
const sqlFilePath = path.join(__dirname, 'insert_words.sql');

// Criar uma instância do banco de dados
const db = new sqlite3.Database(dbPath);

// Função para executar o arquivo SQL
const insertWords = () => {
  fs.readFile(sqlFilePath, 'utf8', (err, sql) => {
    if (err) {
      console.error('Error reading SQL file:', err.message);
      return;
    }

    db.exec(sql, (err) => {
      if (err) {
        console.error('Error executing SQL from file:', err.message);
      } else {
        console.log('Words inserted successfully.');
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
  });
};

// Executar a inserção
insertWords();
