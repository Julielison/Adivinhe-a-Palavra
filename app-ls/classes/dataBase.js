import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Caminho para o banco de dados
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, './data.db');

export default class DataBase {
    constructor() {
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error opening database:', err.message);
            } else {
                console.log('Database connected.');
            }
        });
    }
    
    // ok
    // Verifica se o usuário existe no banco de dados
    userExists(player, callback){
        // Consulta SQL para verificar se o usuário existe
        const query = `SELECT COUNT(*) AS count
                        FROM Players
                        WHERE name = ?`;

        this.db.get(query, [player.name], (err, row) => {
            if (err) {
              console.error('Error executing SQL query:', err.message);
              callback(err, false);
              return;
            }
        
            // Verificar se o usuário existe
            const exists = row.count > 0;
            callback(null, exists);
        })
    }
    
    // ok
    // Adiciona nome e senha do jogador no dataBase
    addPlayerToDatabase(p1, callback) {
        this.db.run(`INSERT INTO Players (name, password) VALUES (?, ?)`, [p1.name, p1.password], (err) => {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    }

    //ok
    // Retorna informações do jogador
    getPlayerInfoByName(p1, callback) {
        // Consulta ao banco de dados para obter ID, senha e score
        this.db.get(`SELECT id, password, score FROM Players WHERE name = ?`, [p1.name], (err, row) => {
            if (err) {
                return callback(err);
            }

            // Retorna o resultado
            callback(null, row);
        });
    }

    // ok
    // Função para obter palavras adivinhadas por ID do jogador
    getGuessedWordsByPlayerId(playerId, callback) {
    this.db.all(`
        SELECT w.word
        FROM Guessed_Words gw
        JOIN Words w ON gw.id_word = w.id
        WHERE gw.id_player = ?
    `, [playerId], (err, rows) => {
        if (err) {
            return callback(err);
        }
        // Retorna as palavras adivinhadas
        callback(null, rows.map(row => row.word));
    });
}

    // Método para fechar a conexão com o banco de dados
    close() {
        this.db.close((err) => {
            if (err) {
                console.error('Error closing the database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
        });
    }


    // Método para recuperar palavras excluindo IDs
    getExcludedWords(excludeIds, callback) {
        const query = `SELECT * FROM Palavras WHERE id NOT IN (${excludeIds.join(',')})`;
        this.db.all(query, (err, rows) => {
            if (err) {
                console.error('Error executing SQL query:', err.message);
                callback(err, null);
                return;
            }
            callback(null, rows);
        });
    }

    // Outros métodos para operações adicionais podem ser adicionados aqui
}