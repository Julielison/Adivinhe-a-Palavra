import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Caminho para o banco de dados
const dbPath = './data.db';
// Caminho para o arquivo SQL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sqlFilePath = path.join(__dirname, 'create_tables.sql');

// Criação e configuração do banco de dados
const db = new sqlite3.Database(dbPath);

// Função para criar o banco de dados e tabelas
const createDatabase = () => {
  // Ler o conteúdo do arquivo SQL
  fs.readFile(sqlFilePath, 'utf8', (err, sql) => {
    if (err) {
      console.error('Error reading SQL file:', err.message);
      return;
    }

    // Executar a consulta SQL lida do arquivo
    db.exec(sql, (err) => {
      if (err) {
        console.error('Error executing SQL from file:', err.message);
        db.close((closeErr) => {
          if (closeErr) {
            console.error('Error closing the database:', closeErr.message);
          } else {
            console.log('Database connection closed.');
          }
        });
        return;
      }
      console.log('Database and tables created successfully.');

      // Inserir dados de exemplo (opcional)
      const stmt = db.prepare("INSERT INTO Jogadores (id, nome) VALUES (?, ?)");
      stmt.run(1, "Alice");
      stmt.run(2, "Bob");
      stmt.finalize((finalizeErr) => {
        if (finalizeErr) {
          console.error('Error finalizing statement:', finalizeErr.message);
        }

        // Consultar e exibir dados
        db.each("SELECT id, nome FROM Jogadores", (err, row) => {
          if (err) {
            console.error('Error fetching data:', err.message);
            return;
          }
          console.log(`${row.id}: ${row.nome}`);
        }, (err) => {
          if (err) {
            console.error('Error completing query:', err.message);
          }

          // Fechar a conexão
          db.close((closeErr) => {
            if (closeErr) {
              console.error('Error closing the database:', closeErr.message);
            } else {
              console.log('Database connection closed.');
            }
          });
        });
      });
    });
  });
};

// Iniciar a criação do banco de dados e tabelas
createDatabase();