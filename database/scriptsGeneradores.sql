-- Escoger Base de Datos ----
USE test_web;

-- Eliminar Tablas --
DROP TABLE IF EXISTS Usuarios;
DROP TABLE IF EXISTS Canchas;
DROP TABLE IF EXISTS Reservaciones;

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
    FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID),
    FOREIGN KEY (ID_Cancha) REFERENCES Canchas(ID));




