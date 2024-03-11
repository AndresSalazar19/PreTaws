CREATE TABLE users(
     id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
--@block
CREATE TABLE libros(
    id INT AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    sinopsis VARCHAR(1200),
    owner_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(owner_id) REFERENCES users(id)
);

--@block
SELECT * FROM libros;

--@block
INSERT INTO libros (owner_id,titulo,autor,genero,sinopsis)
VALUES 
(1,'Cálculo','Purcell', 'Aprendizaje','Este libro de Edwin Purcell & Dale Varberg continúa siendo la obra más breve de los principales textos de cálculo exitosos.')

--@block
SELECT * FROM users


--@block
CREATE TABLE Bookings(

);

--@block
