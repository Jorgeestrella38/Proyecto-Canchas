/*jshint esversion: 6 */
const queries = require("../database/commonQueries.js");
const canchas = require("./cancha.js");
const users = require("./user");

// Una peticion es el body de un post, y un usuario
let PeticionReservacion = function(reqUser, cancha, reqBody){
    this.user = reqUser;
    this.cancha = cancha
    this.fechaInicio = new Date(reqBody.fechaInicio);
    this.fechaFinal = new Date(reqBody.fechaFinal);
};

let resultadoPeticion = function(exito, message){
    this.exito= exito;
    this.message = message;
};

// Los pasos para resolver una Peticion son:
// 1.- Checar que no haya una reservacion que chocante
// 2.- Checar que el usuario cumpla con las reglas para agendar peticion
// 3.- Agregar peticion  a la base de datos
// 4.- Al final se devuelve un objeto de resultado;

// No se deben llamar manualmente las funciones, solo resolverPeticion.

PeticionReservacion.prototype.resolverPeticion = function(connection, callback){

};

// Encontrar la cantidad de Reservaciones que tengan fecha de inicio < mi fecha final y fecha final > mi fecha de inicio
PeticionReservacion.prototype.checarConflictos = function(connection, callback){

};

// Por el momento no sabemos de reglas especificas, pero aqui se checarian
PeticionReservacion.prototype.checarReglasUsuario = function(connection, callback){

};

PeticionReservacion.prototype.insertarPeticion = function(connection, callback){
    let fechaInicio = this.fechaInicio.toISOString().slice(0, 19).replace('T', ' ');
    let fechaFinal = this.fechaFinal.toISOString().slice(0, 19).replace('T', ' ');
    let idUsuario = this.user.ID;
    let idCancha = this.cancha.ID;
    const query = queries.insertReservacion(fechaInicio, fechaFinal, idUsuario, idCancha);
    connection.query(query, (error, results, fields) => {
        if(error){
            callback(new resultadoPeticion(false, "Hubo un error desconocido, refresque la página e intentelo de nuevo"));
            return;
        }
        callback(new resultadoPeticion(true, "Listo, hemos agregado su reservación"));
        return;
    });
};

//exports
module.exports = {PeticionReservacion};
