import DataBase from '../classes/dataBase.js';

const nome = 'Fulano';
const pss = '1234';

const p1 = new Player(nome, pss);

const db = new DataBase();

const lista = await db.getTopPlayers();
console.log(lista)