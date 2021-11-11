-- Escoger Base de Datos ----
USE test_web;

-- Eliminar Tablas --
DROP TABLE IF EXISTS Usuarios;
DROP TABLE IF EXISTS Canchas;
DROP TABLE IF EXISTS Reservaciones;
DROP TABLE IF EXISTS Recurrentes;
-- Crear Tablas --



CREATE TABLE Usuarios(
    ID varchar(100) PRIMARY KEY,
    Nombre_Completo varchar(255) NOT NULL,
    Es_Admin BOOLEAN NOT NULL);

CREATE TABLE Canchas(
    ID int PRIMARY KEY AUTO_INCREMENT,
    Nombre varchar(255) NOT NULL,
    Disponible BOOLEAN NOT NULL
);

CREATE TABLE Reservaciones(
    ID int PRIMARY KEY AUTO_INCREMENT,
    Fecha_Inicio DATETIME NOT NULL,
    Fecha_Fin DATETIME NOT NULL,
    Aprobada BOOLEAN NOT NULL,
    ID_Usuario varchar(100) NOT NULL,
    ID_Cancha int NOT NULL,
    Comentarios varchar(200) NOT NULL,
    Fecha_Peticion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID),
    FOREIGN KEY (ID_Cancha) REFERENCES Canchas(ID));

CREATE TABLE Recurrentes(
    ID int PRIMARY KEY AUTO_INCREMENT,
    Lunes BOOLEAN NOT NULL,
    Martes BOOLEAN NOT NULL,
    Miercoles BOOLEAN NOT NULL,
    Jueves BOOLEAN NOT NULL,
    Viernes BOOLEAN NOT NULL,
    Sabado BOOLEAN NOT NULL,
    Domingo BOOLEAN NOT NULL,
    Hora_Inicio TIME NOT NULL,
    Hora_Fin TIME NOT NULL,
    ID_Cancha int NOT NULL,
    Comentarios varchar(200) NOT NULL,
    FOREIGN KEY (ID_Cancha) REFERENCES Canchas(ID));




-- Agregar Cnachas
INSERT INTO Canchas(Nombre, Disponible) VALUES(
    'Básquetbol',
    true);

INSERT INTO Canchas(Nombre, Disponible) VALUES(
    'Fútbol',
    true);

INSERT INTO Canchas(Nombre, Disponible) VALUES(
    'Volleyball',
    true);

INSERT INTO Canchas(Nombre, Disponible) VALUES(
    'Tennis',
    true);

INSERT INTO Canchas(Nombre, Disponible) VALUES(
    'Padel',
    true);
