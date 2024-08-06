// import { saveNamePlayer } from './saveNamePlayer.js';

// // Nome do jogador a ser inserido
// const playerName = 'Carlos';

// // Chamar a função para salvar o nome do jogador
// saveNamePlayer(playerName);*/

// import { getPlayerDataByName } from './recoveryDataFromPlayer.js'; // Ajuste o caminho conforme necessário

// const playerName = 'Alice';

// getPlayerDataByName(playerName, (err, data) => {
//   if (err) {
//     console.error('Failed to retrieve player data:', err);
//   } else if (data) {
//     console.log(`Nome: ${data.nome}`);
//     console.log(`Score: ${data.score}`);
//     console.log(`Palavras Adivinhadas IDs: ${data.palavras_adivinhadas.join(', ')}`);
//   } else {
//     console.log('Jogador não encontrado.');
//   }
// });

import { getUnsortedWords } from './getUnsortedWords.js';

// IDs a serem excluídos
const excludeIds = [1, 2, 3];

// Usar a função para recuperar palavras
getUnsortedWords(excludeIds, (err, rows) => {
  if (err) {
    console.error('Error retrieving words:', err.message);
  } else {
    console.log('Retrieved words:', rows);
  }
});

