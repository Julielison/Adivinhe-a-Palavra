// import Player from './teste.js'; // Ajuste o caminho conforme necessário

// async function getTopPlayers() {
//     try {
//         const topPlayers = await Player.findAll({
//             attributes: ['name', 'score'],
//             order: [['score', 'DESC']],
//             limit: 10
//         });

//         return topPlayers;
//     } catch (err) {
//         console.error('Error fetching top players:', err.message);
//         throw err;
//     }
// }

// async function displayTopPlayers() {
//     try {
//         const topPlayers = await getTopPlayers();
//         console.log('Top Players:', topPlayers);
//     } catch (err) {
//         console.error('Error displaying top players:', err.message);
//     }
// }

// displayTopPlayers();