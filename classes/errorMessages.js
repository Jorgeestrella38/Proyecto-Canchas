/*jshint esversion: 6 */ 

let ErrorMessage = function(message, solution){
    this.message = message;
    this.solution = solution;
};

// All error messages extend ErrorMessage
let ErrorNoLogin = function(){
    const message = "Usuario no autorizado";
    const solution = "Inicia sesión con la cuenta universitaria para poder acceder a la pagina";
    ErrorMessage.call(this, message, solution);
};
Object.setPrototypeOf(ErrorNoLogin, ErrorMessage.prototype);

let ErrorFailedLogin = function(){
    const message = "Inicio de sesión fallido";
    const solution = "Vuelve a iniciar sesión con la cuenta universitaria para poder acceder a la pagina";
    ErrorMessage.call(this, message, solution);
};
Object.setPrototypeOf(ErrorFailedLogin, ErrorMessage.prototype);

let ErrorNotAuthorized = function(){
    const message = "Permisos Insuficientes";
    const solution = "Contacta con los desarrolladores de la pagina para obtener los permisos correspondientes";
    ErrorMessage.call(this, message, solution);
};
Object.setPrototypeOf(ErrorNotAuthorized, ErrorMessage.prototype);

let ErrorPageMissing = function(){
    const message = "Pagina no encontrada";
    const solution = "Checa el URL de la pagina o regresa a la pagina de inicio";
    ErrorMessage.call(this, message, solution);
};
Object.setPrototypeOf(ErrorPageMissing, ErrorMessage.prototype);

// exports
module.exports = { ErrorNoLogin, ErrorFailedLogin, ErrorNotAuthorized, ErrorPageMissing};
