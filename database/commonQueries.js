/*jshint esversion: 6 */
function getUserFromID(id){
    let query = `SELECT * FROM Usuarios WHERE id = '${id}';`;
    return query;
}

function addUser(id, name, admin = false){
    let query = `INSERT INTO Usuarios  VALUES(
        '${id}',
        '${name}',
        ${admin});`;
    return query;
}

function getCanchaFromID(id){
    let query = `SELECT * FROM Canchas
    WHERE ID = ${id};`;
    return query;
}

function getReservaciones(idCancha){
    const oneYearMiliseconds = 1*365*24*60*60*1000;
    let fechaInicio = new Date();
    let fechaFin = new Date();


    fechaInicio.setTime(fechaInicio.getTime() - oneYearMiliseconds);
    fechaInicio = fechaInicio.toISOString().slice(0, 19).replace('T', ' ');
    
    fechaFin.setTime(fechaFin.getTime() + oneYearMiliseconds);
    fechaFin = fechaFin.toISOString().slice(0, 19).replace('T', ' ');

    let query = `SELECT res.ID idReservacion, unix_timestamp(res.Fecha_Inicio) fechaInicio, unix_timestamp(res.Fecha_Fin) fechaFin, res.Aprobada aprobada, res.ID_Usuario idUsuario, res.ID_Cancha idCancha, usr.Nombre_Completo nombreUsuario, usr.Es_Admin esAdmin
        FROM Reservaciones res
        JOIN Usuarios usr on res.ID_Usuario = usr.ID
        WHERE ID_Cancha = ${idCancha} AND
        (Fecha_Inicio BETWEEN '${fechaInicio}' AND '${fechaFin}')
        ORDER BY Fecha_Inicio;`;

    return query;
}

function insertReservacion(fechaInicio, fechaFin, idUsuario, idCancha, aprobado = false, comentarios = ""){
    let query = `INSERT INTO Reservaciones(Fecha_Inicio, Fecha_Fin, Aprobada, ID_Usuario, ID_Cancha, Comentarios)
    VALUES ('${fechaInicio}',
    '${fechaFin}',
    ${aprobado},
    '${idUsuario}',
    ${idCancha},
    '${comentarios}');`;

    return query;
}

function checarConflictos(fechaInicio, fechaFin, idCancha){
    let query = `
    SELECT count(1) conflictos
    FROM Reservaciones
    WHERE Fecha_Inicio < '${fechaFin}'
    AND Fecha_Fin > '${fechaInicio}'
    AND ID_Cancha = ${idCancha};`;
    return query;
}

function getRecurrentes(idCancha){
    let query = `SELECT * FROM Recurrentes
    WHERE ID_Cancha = ${idCancha};`;
    return query;
}

// exports
module.exports = { getUserFromID, addUser, getCanchaFromID, getReservaciones, insertReservacion, checarConflictos, getRecurrentes};
