/*jshint esversion: 6 */ 
const queries = require("../database/commonQueries.js");

/*
En la base de datos...
Reservaciones = 
    {
        ID: 3 (Int),
        Fecha_Inicio: '2017-02-04 11:23:54' (Datetime)
        Fecha_Fin: '2017-02-05 11:23:54' (Datetime) (No se incluye la hora fin [ -)
        Aprobada: true (Boolean)
        ID_Usuario: "0226259"
        ID_Cancha: 2
    };
*/

// La estructura de sqlReservacion esta en la carpeta de database/commonQueries.js
// Hay un ejemplo en database/ejemplos
let ReservacionesCancha = function(cancha, sqlReservacion){
    this.cancha = cancha;
    this.reservaciones = sqlReservacion;
};


function getReservacionesOfCancha(cancha, connection, fn){
    const query = queries.getReservaciones(cancha.ID);
    connection.query(query, (error, results, fields) => {
        if(error){
            fn(cancha, null);
            return;
        }
        fn(cancha, new ReservacionesCancha(cancha, results));
        return;
    });
}

//exports
module.exports = {getReservacionesOfCancha};

