DROP TABLE IF EXISTS TB_HEROIS;

CREATE TABLE TB_HEROIS(
    ID int GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
)

INSERT INTO TB_HEROIS(NOME, PODER)
VALUES
('Flash', 'Speed'),
('Aquaman', 'Speck how enemol'),
('Batman', 'Money')

SELECT * FROM TB_HEROIS
SELECT * FROM TB_HEROIS WHERE NOME = 'Flash'

UPDATE TB_HEROIS
SET NOME = 'Gocu', PODER = 'Força'
WHERE ID = 1

DELETE FROM TB_HEROIS WHERE ID = 1;
SELECT * FROM TB_HEROIS