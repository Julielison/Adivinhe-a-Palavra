import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

// Caminho para o banco de dados
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, './data.db');

export default class DataBase {
    // Array de objetos todas as palavras e dicas
    static allWordsAndHints;

    constructor() {
        // Usando sqlite para retornar uma Promise que será usada nas operações
        this.dbPromise = open({
            filename: dbPath,
            driver: sqlite3.Database
        });
    }

    // Verifica se o usuário existe no banco de dados
    async userExists(player) {
        const db = await this.dbPromise;
        const query = `SELECT COUNT(*) AS count FROM Players WHERE name = ?`;

        try {
            const row = await db.get(query, [player.name]);
            return row.count > 0;
        } catch (err) {
            console.error('Error executing SQL query:', err.message);
            throw err;
        }
    }

    // Adiciona nome e senha do jogador no dataBase
    async addPlayerToDatabase(player) {
        const db = await this.dbPromise;

        try {
            await db.run(`INSERT INTO Players (name, password) VALUES (?, ?)`, [player.name, player.password]);
        } catch (err) {
            console.error('Error adding player to database:', err.message);
            throw err;
        }
    }

    // Retorna informações do jogador
    async getPlayerInfoByName(player) {
        const db = await this.dbPromise;
        const query = `SELECT id, password, score FROM Players WHERE name = ?`;

        try {
            const row = await db.get(query, [player.name]);
            return row;
        } catch (err) {
            console.error('Error retrieving player info:', err.message);
            throw err;
        }
    }

    // Função para obter os ids das palavras não adivinhadas pelo jogador
    async getIdFromUnGuessedWordsByPlayerId(playerId) {
        const db = await this.dbPromise;
        const query = `
            SELECT w.id
            FROM Words w
            WHERE w.id NOT IN (
                SELECT gw.id_word
                FROM Guessed_Words gw
                WHERE gw.id_player = ?
            )
        `;
    
        try {
            const rows = await db.all(query, [playerId]);
            console.log(rows)
            return rows;
        } catch (err) {
            console.error('Error retrieving unguessed words:', err.message);
            throw err;
        }
    }
    

    // Método para fechar a conexão com o banco de dados
    async close() {
        const db = await this.dbPromise;
        try {
            await db.close();
            console.log('Database connection closed.');
        } catch (err) {
            console.error('Error closing the database:', err.message);
            throw err;
        }
    }

    // Função para recuperar todas as palavras da tabela Words
    async getAllWords() {
        const db = await this.dbPromise;
        const query = `
            SELECT word, hint
            FROM Words
            ORDER BY id ASC`;

        try {
            DataBase.allWordsAndHints = await db.all(query);
        } catch (err) {
            console.error('Error executing SQL query:', err.message);
            throw err;
        }
    }

    // Retorna um objeto {word: 'example', hint: 'example'}
    static getWordHint(id){
        return DataBase.allWordsAndHints[id-1]
    }
}
