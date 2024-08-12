import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

// Modelo para a tabela Players
const Player = sequelize.define('Player', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Modelo para a tabela Words
const Word = sequelize.define('Word', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    word: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    hint: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Modelo para a tabela Guessed_Words
const GuessedWord = sequelize.define('GuessedWord', {
    id_player: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Player,
            key: 'id'
        }
    },
    id_word: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Word,
            key: 'id'
        }
    }
});

// Associações
Player.belongsToMany(Word, { through: GuessedWord, foreignKey: 'id_player' });
Word.belongsToMany(Player, { through: GuessedWord, foreignKey: 'id_word' });

// Sincronizando o banco de dados
async function initializeDatabase() {
    try {
        await sequelize.sync({ force: true }); // `force: true` recria as tabelas se já existirem
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error syncing the database:', error);
    }
}

initializeDatabase();

// Função para Inserir Dados
async function insertData() {
    try {
        await sequelize.sync({ force: true }); // `force: true` recria as tabelas se já existirem

        // Inserir dados na tabela Players
        await Player.bulkCreate([
            { name: 'Alice', score: 100, password: 'password123' },
            { name: 'Bob', score: 150, password: 'password456' },
            { name: 'Charlie', score: 200, password: 'password789' },
            { name: 'Diana', score: 250, password: 'password101' },
            { name: 'Edward', score: 300, password: 'password202' }
        ]);

        // Inserir dados na tabela Words
        await Word.bulkCreate([
            { word: 'apple', hint: 'A fruit' },
            { word: 'banana', hint: 'A yellow fruit' },
            { word: 'cherry', hint: 'A small red fruit' },
            { word: 'date', hint: 'A sweet fruit' },
            { word: 'elderberry', hint: 'A dark purple fruit' }
        ]);

        // Recuperar os ids dos jogadores e palavras
        const players = await Player.findAll();
        const words = await Word.findAll();

        // Inserir dados na tabela Guessed_Words
        await GuessedWord.bulkCreate([
            { id_player: players[0].id, id_word: words[0].id },
            { id_player: players[1].id, id_word: words[1].id },
            { id_player: players[2].id, id_word: words[2].id },
            { id_player: players[3].id, id_word: words[3].id },
            { id_player: players[4].id, id_word: words[4].id }
        ]);

        console.log('Data inserted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
}

insertData();
export default Player;