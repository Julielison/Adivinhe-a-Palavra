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