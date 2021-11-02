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

// exports
module.exports = { getUserFromID, addUser, getCanchaFromID };
