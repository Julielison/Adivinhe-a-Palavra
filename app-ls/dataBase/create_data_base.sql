-- Cria a tabela Jogadores
CREATE TABLE Jogadores (
    id INTEGER PRIMARY KEY,
    Nome TEXT NOT NULL
);

-- Cria a tabela Palavras
CREATE TABLE Palavras (
    id INTEGER PRIMARY KEY,
    palavra TEXT NOT NULL,
    dica TEXT NOT NULL
);

-- Cria a tabela palavras_adivinhadas_por_jogador
CREATE TABLE palavras_adivinhadas_por_jogador (
    id_jogador INTEGER,
    id_palavra INTEGER,
    PRIMARY KEY (id_jogador, id_palavra),
    FOREIGN KEY (id_jogador) REFERENCES Jogadores(id),
    FOREIGN KEY (id_palavra) REFERENCES Palavras(id)
);