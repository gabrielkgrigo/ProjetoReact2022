CREATE TABLE Pokemon (
	id_pokemon INT IDENTITY (1, 1) NOT NULL,
	numero INT NOT NULL UNIQUE,
	nome VARCHAR (30) NULL,
	id_elemento INT NULL,
	id_regiao INT NULL,
	PRIMARY KEY CLUSTERED ([id_pokemon] ASC)
);

CREATE TABLE Elemento (
    id_elemento      INT          IDENTITY (1, 1) NOT NULL,
    nome    VARCHAR (30) NULL,
    PRIMARY KEY CLUSTERED ([id_elemento] ASC)
);

CREATE TABLE Regiao (
    id_regiao      INT          IDENTITY (1, 1) NOT NULL,
    nome    VARCHAR (30) NULL,
    PRIMARY KEY CLUSTERED ([id_regiao] ASC)
);

INSERT INTO Pokemon (numero,nome,id_elemento,id_regiao) VALUES (1, 'Bulbasaur', 4, 1)
INSERT INTO Pokemon (numero,nome,id_elemento,id_regiao) VALUES (4, 'Charmander', 2, 1)
INSERT INTO Pokemon (numero,nome,id_elemento,id_regiao) VALUES (7, 'Squirtle', 3, 1)
INSERT INTO Pokemon (numero,nome,id_elemento,id_regiao) VALUES (25, 'Pikachu', 5, 1)
INSERT INTO Pokemon (numero,nome,id_elemento,id_regiao) VALUES (196, 'Espeon', 11, 2)
INSERT INTO Pokemon (numero,nome,id_elemento,id_regiao) VALUES (197, 'Umbreon', 15, 2)

INSERT INTO Elemento (nome) VALUES ('Normal')
INSERT INTO Elemento (nome) VALUES ('Fogo')
INSERT INTO Elemento (nome) VALUES ('Água')
INSERT INTO Elemento (nome) VALUES ('Grama')
INSERT INTO Elemento (nome) VALUES ('Elétrico')
INSERT INTO Elemento (nome) VALUES ('Gelo')
INSERT INTO Elemento (nome) VALUES ('Lutador')
INSERT INTO Elemento (nome) VALUES ('Venenoso')
INSERT INTO Elemento (nome) VALUES ('Terrestre')
INSERT INTO Elemento (nome) VALUES ('Voador')
INSERT INTO Elemento (nome) VALUES ('Psíquico')
INSERT INTO Elemento (nome) VALUES ('Inseto')
INSERT INTO Elemento (nome) VALUES ('Pedra')
INSERT INTO Elemento (nome) VALUES ('Fantasma')
INSERT INTO Elemento (nome) VALUES ('Sombrio')
INSERT INTO Elemento (nome) VALUES ('Dragão')
INSERT INTO Elemento (nome) VALUES ('Aço')
INSERT INTO Elemento (nome) VALUES ('Fada')

INSERT INTO Regiao (nome) VALUES ('Kanto')
INSERT INTO Regiao (nome) VALUES ('Johto')
INSERT INTO Regiao (nome) VALUES ('Hoenn')
INSERT INTO Regiao (nome) VALUES ('Sinnoh')
INSERT INTO Regiao (nome) VALUES ('Unova')
INSERT INTO Regiao (nome) VALUES ('Kalos')
INSERT INTO Regiao (nome) VALUES ('Alola')
INSERT INTO Regiao (nome) VALUES ('Galar')

SELECT
	p.id_pokemon,
	p.numero,
	p.nome,
	e.nome as elemento,
	r.nome as regiao
FROM 
	Pokemon p
LEFT JOIN
	Elemento e ON p.id_elemento = e.id_elemento
LEFT JOIN
	Regiao r ON p.id_regiao = r.id_regiao
