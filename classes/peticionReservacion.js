/*jshint esversion: 6 */
const queries = require("../database/commonQueries.js");
const canchas = require("./cancha.js");
const users = require("./user");

// Una peticion es el body de un post, y un usuario
let PeticionReservacion = function(reqUser, cancha, reqBody){
    this.user = reqUser;
    this.cancha = cancha;
    this.fechaInicio = new Date(reqBody.fechaInicio);
    this.fechaFinal = new Date(reqBody.fechaFinal);
    this.comentarios =  reqBody.comentarios;
};

let ResultadoPeticion = function(exito, message){
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
    
    this.checarConflictos(connection, (numberConflicts) =>{
        if(numberConflicts == 0){
            this.checarReglasUsuario(connection, (peticionCorrecta) =>{
                if(peticionCorrecta){
                    this.insertarPeticion(connection, (resultado) => {
                        callback(resultado);
                        return;
                    });
                }else{
                    callback(new ResultadoPeticion(false, "No se puede completar la reservacion en este momento. Checa el reglamento de reservacion de canchas"));
                }
            });
        }
        else{
            callback(new ResultadoPeticion(false, "La reservacion choca con una reservacion ya existente"));
        }
    });
};

// Encontrar la cantidad de Reservaciones que tengan fecha de inicio < mi fecha final y fecha final > mi fecha de inicio
PeticionReservacion.prototype.checarConflictos = function(connection, callback){
    let miFechaInicio =  this.fechaInicio.toISOString().slice(0, 19).replace('T', ' ');
    let miFechaFin = this.fechaFinal.toISOString().slice(0, 19).replace('T', ' ');
    const query = queries.checarConflictos(miFechaInicio, miFechaFin, this.cancha.ID);
    connection.query(query, (error, results, fields) => {
        if(error){
            callback(1);
        }else{
            callback(results[0].conflictos);
        }
    });
};

// Por el momento no sabemos de reglas especificas, pero aqui se checarian
PeticionReservacion.prototype.checarReglasUsuario = function(connection, callback){
    callback(true);
};

PeticionReservacion.prototype.insertarPeticion = function(connection, callback){
    let fechaInicio = this.fechaInicio.toISOString().slice(0, 19).replace('T', ' ');
    let fechaFinal = this.fechaFinal.toISOString().slice(0, 19).replace('T', ' ');
    let idUsuario = this.user.ID;
    let idCancha = this.cancha.ID;
    let comentarios = this.comentarios;
    const query = queries.insertReservacion(fechaInicio, fechaFinal, idUsuario, idCancha, false, comentarios);
    connection.query(query, (error, results, fields) => {
        if(error){
            callback(new ResultadoPeticion(false, "Hubo un error desconocido, refresque la página e intentelo de nuevo"));
            return;
        }
        callback(new ResultadoPeticion(true, "Listo, hemos agregado su reservación"));
        return;
    });
};

//exports
module.exports = {PeticionReservacion};
