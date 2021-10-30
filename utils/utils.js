/*jshint esversion: 6 */ 
function getFirstName(fullName){
    let firstName = fullName.split(" ");
    return firstName[0];
}

function getUserInfo(user){
    if(user){
    user.Primer_Nombre = getFirstName(user.Nombre_Completo);
    }
    return user;
}

// Exports
module.exports = {getUserInfo};