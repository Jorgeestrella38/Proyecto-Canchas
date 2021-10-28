/*jshint esversion: 6 */ 
// -----------------------SQL -----------------------
const dbUtils = require("./database/connection.js");
const  dbConnection = dbUtils.createConnection();

// -----------------------Passport -----------------------
const passport = require('passport');
const passportFactory = require("./database/passportFactory.js");
const session = require("express-session");
passportFactory.setupPassport(passport);


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
  
// Variable de prueba temporal
const userInfo = 
    {
        name: "",
        email: ""
    };


// -----------------------Functions-----------------------

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
  
// Google Auth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// Server setup
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

