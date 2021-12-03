/*jshint esversion: 6 */ 
/* 
En la base de datos...
Usuarios = 
    {
        ID: "0226259",
        Nombre_Completo: "Juan Marquina Cancino",
        Es_Admin: true
    };
*/

let User = function(requestUser){
    if(requestUser != null){
        this.Autentificado = true;
        this.Nombre_Completo = requestUser.Nombre_Completo;
        this.ID = requestUser.ID;
        this.Es_Admin = requestUser.Es_Admin;
    }else{
        this.Autentificado = false;
    }
};

User.prototype.getFirstName = function(){
    if(this.Autentificado == false) return "";
    let firstName = this.Nombre_Completo.split(" ");
    return firstName[0];
};

// exports
module.exports = {User};
