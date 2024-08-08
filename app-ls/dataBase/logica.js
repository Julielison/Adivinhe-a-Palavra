import Player from '../classes/player.js';
import DataBase from '../classes/dataBase.js';

// Clicou em iniciar
const password = 1234;
const nome = 'Bob';

// Cria o objeto player
const p1 = new Player(nome, password)

// Cria uma conexão com o data base
const db = new DataBase()

// Verifica se o usuário está no data base
db.userExists(p1, (err, exists) => {
    if (err) {
        console.error('Error checking user existence:', err.message);
    } else {
        
        if (exists) {
            db.getPlayerInfoByName(p1, (err, playerInfo) => {
                
                if (err) {
                    console.error('Erro ao obter informações do jogador:', err.message);
                } else {

                    db.getGuessedWordsByPlayerId(playerInfo.id, (err, guessedWords) => {
                        
                        if (err) {
                            console.error('Erro ao obter palavras adivinhadas:', err.message);
                        } else {
                            console.log('Palavras adivinhadas:', guessedWords);
                            p1.updatePlayerInfo(playerInfo, guessedWords)
                        }
                    });
                }
            });
            //console.log(`O jogador "${p1.name}" existe.`);
        } else {
            db.addPlayerToDatabase(p1, (err) => {
                if (err) {
                    console.error('Erro ao adicionar jogador:', err.message);
                } else {
                    console.log(`Jogador adicionado com sucesso.`)
                }
            });
            //console.log(`O jogador "${p1.name}" não existe.`);
        }
    }

    // Fechar a conexão com o banco de dados após todas as operações
    db.close();
});