/*jshint esversion: 6 */
const queries = require("../database/commonQueries.js");

/* 
En la base de datos...
Canchas = 
    {
        ID: "1" //autoincrement,
        Nombre: "Basquetball 1"
        Disponible: true
    };
*/
// Create a local Cancha instance
let Cancha = function(sqlRow){
    this.ID = sqlRow.ID;
    this.Nombre = sqlRow.Nombre;
    this.Disponible = sqlRow.Disponible;
};

function getCanchaFromID(id, connection, fn){
    const query =  queries.getCanchaFromID(id);
    connection.query(query, (error,results, fields) => {
        if(error){
            fn(null);
            return;
        }
        if(results.length != 1){
            fn(null);
            return;
        }
        fn(new Cancha(results[0]));
        return;
    });
}

//exports
module.exports = {getCanchaFromID};
