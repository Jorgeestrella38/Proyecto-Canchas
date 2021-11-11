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
let ReservacionesCancha = function(cancha, sqlReservacion, sqlRecurrentes){
    this.cancha = cancha;
    this.reservaciones = sqlReservacion;
    this.recurrentes = sqlRecurrentes;
};
ReservacionesCancha.prototype.infoDate = function(date){
    // En caso de que no se haya "corregido" la hora de js
    const sixHourMiliseconds = 6*60*60*1000;
    date.setTime(date.getTime() - sixHourMiliseconds);
    
    for (let reservacion of this.reservaciones){
        if(date.getTime() >= reservacion.fechaInicio*1000 && date.getTime() < reservacion.fechaFin*1000){
            return reservacion;
        }
    }
    return null;
};



function getReservacionesOfCancha(cancha, connection, fn){
    const query = queries.getReservaciones(cancha.ID);
    connection.query(query, (error, results, fields) => {
        if(error){
            fn(cancha, null);
            return;
        }
        const queryRecurrentes = queries.getRecurrentes(cancha.ID);
        connection.query(queryRecurrentes, (errorRec, resultsRec, fieldsRec) => {
            if(errorRec){
                fn(cancha, null);
            }
            fn(cancha, new ReservacionesCancha(cancha, results, resultsRec));
        });
         
        
        return;
    });
}


//exports
module.exports = {getReservacionesOfCancha, ReservacionesCancha};
