/*jshint esversion: 6 */ 
const mysql = require('mysql');
const fs = require('fs');

// Reads credentials
function getCredentials(){
    const data = fs.readFileSync('./database/credentials.txt');
    const arr = data.toString().replace(/\r\n/g,'\n').split('\n');
    const cred = {
        user: arr[0],
        password: arr[1],
        database: arr[2],
        host: arr[3]
    };
    return cred;

}

function createConnection(){
    const cred = getCredentials();
    const connection = mysql.createConnection(cred);
    connection.connect( (error) => {
        if (error){
            console.log(error);
        } else{
            console.log("Conexion MySQL Exitosa");
        }
        
    });
    return connection;
}

// exports
module.exports = { createConnection };
