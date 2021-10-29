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

// exports
module.exports = { getUserFromID, addUser };