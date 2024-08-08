-- Cria a tabela Jogadores
CREATE TABLE IF NOT EXISTS Players (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    score INTEGER DEFAULT 0,
    password TEXT NOT NULL
);

-- Cria a tabela Palavras
CREATE TABLE IF NOT EXISTS Words (
    id INTEGER PRIMARY KEY,
    word TEXT UNIQUE NOT NULL,
    hint TEXT NOT NULL
);

-- Cria a tabela palavras_adivinhadas_por_jogador
CREATE TABLE IF NOT EXISTS Guessed_Words (
    id_player INTEGER,
    id_word INTEGER,
    PRIMARY KEY (id_player, id_word),
    FOREIGN KEY (id_player) REFERENCES Players(id),
    FOREIGN KEY (id_word) REFERENCES Words(id)
);