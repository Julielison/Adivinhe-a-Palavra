import Player from '../classes/player.js';
import DataBase from '../classes/dataBase.js';

// Clicou em iniciar
const password = 1234;
const nome = 'Alice';

// Cria o objeto player
const player = new Player(nome, password)

// Verifica se o usuário está no data base
async function main() {
    const dbHandler = new DataBase();

    try {
        // Retorna um boolean em relação a existência do player
        let playerExists = await dbHandler.userExists(player);
        console.log('Player exists:', playerExists);

        // Caso ele exista
        if (playerExists){
            // Retorna as informações dele (id, password e score)
            let playerInfo = await dbHandler.getPlayerInfoByName(player);
            console.log('Player info:', playerInfo);

            // Retorna os ids das palavras não adivinhadas com base no id do jogador
            let unguessedWords = await dbHandler.getIdFromUnGuessedWordsByPlayerId(playerInfo.id);
            player.addUnguessedWords(unguessedWords)
        
        // Caso não exista
        } else {
            // Adiciona o player no database
            await dbHandler.addPlayerToDatabase(player);
        }
        // Retorna os dados de todas as palavras do banco
        await dbHandler.getAllWords();
        console.log('All words:', DataBase.allWordsAndHints);

        // Sorteia o id de palavra aleatória
        let id = await player.getRandomIdWord();
        console.log(DataBase.getWordHint(id))

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await dbHandler.close();
    }
}

main();
