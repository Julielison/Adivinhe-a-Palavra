export default class Player {
    constructor(name, password) {
        this.id = undefined;
        this.name = name;
        this.score = 0;
        this.password = password;
        this.guessedWords = [];
    }


    getName() {
        return console.log(this.name);
    }


    getScore() {
        return this.score;
    }

    updatePlayerInfo(playerInfo, guessedWords) {
        this.score = playerInfo.score;
        this.id = playerInfo.id
        this.password = playerInfo.password
        this.guessedWords = guessedWords
    }

    addGuessedWord(...word) {
        word.forEach(word => {
            this.GuessedWords.push(word);
        });
    }

    getGuessedWords() {
        return this.GuessedWords;
    }

}