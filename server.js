/*jshint esversion: 6 */ 
// -----------------------SQL -----------------------
const dbUtils = require("./database/connection.js");
const  dbConnection = dbUtils.createConnection();

// -----------------------Passport -----------------------
const passport = require('passport');
const passportFactory = require("./database/passportFactory.js");
const session = require("express-session");
passportFactory.setupPassport(passport, dbConnection);


// -----------------------Express-----------------------
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// Set Express sessions with passport
app.use(express.static("public"));
app.use(session(
  { secret: "cats",
    resave: true,
    saveUninitialized: true,  
  }));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
  
// Set EJS as templating engine 
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname));
  
/*
userInfo = 
    {
        ID: "0226259",
        Nombre_Completo: "Juan Marquina Cancino",
        Es_Admin: true
    };
*/

// -----------------------Functions-----------------------

app.get('/', (req, res) => {
    res.send('Hello World!');
    // res.redirect('/Inicio');
});

// Pagina de prueba con todos los links
app.get('/Links', (req, res) => {
    res.render('pages/links', { userInfo: req.user });
});

// Home
app.get('/Inicio', (req, res) => {
    res.render('pages/home', { userInfo: req.user });
});

// Reservaciones
app.get('/Reservaciones', (req, res) => {
    res.render('pages/reservations', { userInfo: req.user });
});

// Login
app.get('/IniciarSesion', (req, res) => {
    res.redirect('/auth/google');
});

//Logout
app.get('/CerrarSesion', (req, res) =>{
    req.logout();
    res.redirect('/Inicio');
});

// How to reserve
app.get('/ComoReservar', (req, res) => {
    res.render('pages/howToReserve', { userInfo: req.user });
});

// More info
app.get('/MasInfo', (req, res) => {
    res.render('pages/moreInfo', { userInfo: req.user });
});
  
// Google Auth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/Inicio');
  });

// Server setup
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

