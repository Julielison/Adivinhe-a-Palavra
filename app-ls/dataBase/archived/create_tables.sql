-- Cria a tabela Jogadores
CREATE TABLE IF NOT EXISTS Jogadores (
    id INTEGER PRIMARY KEY,
    nome TEXT UNIQUE NOT NULL,
    score INTEGER DEFAULT 0      
);

-- Cria a tabela Palavras
CREATE TABLE IF NOT EXISTS Palavras (
    id INTEGER PRIMARY KEY,
    palavra TEXT UNIQUE NOT NULL,
    dica TEXT NOT NULL
);

-- Cria a tabela palavras_adivinhadas_por_jogador
CREATE TABLE IF NOT EXISTS palavras_adivinhadas_por_jogador (
    id_jogador INTEGER,
    id_palavra INTEGER,
    PRIMARY KEY (id_jogador, id_palavra),
    FOREIGN KEY (id_jogador) REFERENCES Jogadores(id),
    FOREIGN KEY (id_palavra) REFERENCES Palavras(id)
);