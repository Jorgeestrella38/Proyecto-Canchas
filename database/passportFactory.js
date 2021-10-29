/*jshint esversion: 6 */ 
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const fs = require('fs');
const dbQueries = require('./commonQueries.js');

function getGoogleCred(){
    let rawData =  fs.readFileSync('./database/google_cred.json');
    let credentials = JSON.parse(rawData);
    return credentials;
}

function parseEmail(email){
    let id = email.split('@');
    return id[0];
}


function setupPassport(passport, connection){
    const credentials = getGoogleCred();
    passport.use(new GoogleStrategy({
        clientID: credentials.web.client_id,
        clientSecret: credentials.web.client_secret,
        callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
            let id = parseEmail(profile.emails[0].value);

            connection.query(dbQueries.getUserFromID(id), (error, results, fields) => {
                if (results.length == 0) {
                    // add user if none found
                    let name = profile.displayName;
                    connection.query(dbQueries.addUser(id, name), (error, results, fields) => {
                        if (error)
                            cb(error);
                        connection.query(dbQueries.getUserFromID(id), (error, results, fields) => {
                            cb(error, results[0]);
                        });
                    });
                } else {
                    cb(error, results[0]);
                }
            });

        })
    );

    // send user ID, 
    // Return DB user when deserialized
    passport.serializeUser(function(user, cb) {
        cb(null, user.ID);
      });
    
    passport.deserializeUser(function(obj, cb) {
        connection.query(dbQueries.getUserFromID(obj), (error, results, fields) => {
            cb(null, results[0]);
        }
      );
    });
    

}

// exports
module.exports = { setupPassport };
