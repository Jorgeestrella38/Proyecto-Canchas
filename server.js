/*jshint esversion: 6 */ 
// -----------------------SQL -----------------------
const dbUtils = require("./database/connection.js");
const  dbConnection = dbUtils.createConnection();



// -----------------------Express-----------------------
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
  
// Set EJS as templating engine 
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname));
  
// Variable de prueba teemporal
const userInfo = 
    {
        name: "",
        email: ""
    }


// -----------------------Functions-----------------------
// Principal
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Pagina de prueba con todos los links
app.get('/Links', (req, res) => {
    res.render('pages/links', { userInfo: userInfo });
});

// Home
app.get('/Inicio', (req, res) => {
    res.render('pages/home', { userInfo: userInfo });
});

// Reservaciones
app.get('/Reservaciones', (req, res) => {
    res.render('pages/reservations', { userInfo: userInfo });
});

// Login
app.get('/IniciarSesion', (req, res) => {
    res.render('pages/login', { userInfo: userInfo });
});

// Register
app.get('/Registrarse', (req, res) => {
    res.render('pages/register', { userInfo: userInfo });
});

// How to reserve
app.get('/ComoReservar', (req, res) => {
    res.render('pages/howToReserve', { userInfo: userInfo });
});

// More info
app.get('/MasInfo', (req, res) => {
    res.render('pages/moreInfo', { userInfo: userInfo });
});
  
// Server setup
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

