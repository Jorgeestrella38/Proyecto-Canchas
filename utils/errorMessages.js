/*jshint esversion: 6 */
/* 
error = 
    {
        message: "El error",
        solution: "Mensaje de solucion"
    };
*/

function getErrorLogin(){
    const message = "Usuario no autorizado";
    const solution = "Inicia sesión con la cuenta universitaria para poder acceder a la pagina";
    return {message, solution};
}

function getErrorFailedLogin(){
    const message = "Inicio de sesión fallido";
    const solution = "Vuelve a iniciar sesión con la cuenta universitaria para poder acceder a la pagina";
    return {message, solution};
}

function permisosInsuficientes(){
    const message = "Permisos Insuficientes";
    const solution = "Contacta con los desarrolladores de la pagina para obtener los permisos correspondientes";
    return {message, solution};
}

// exports 
module.exports = { getErrorLogin, getErrorFailedLogin, permisosInsuficientes };
