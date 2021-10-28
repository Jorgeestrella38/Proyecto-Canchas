/*jshint esversion: 6 */ 
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const fs = require('fs');

function getGoogleCred(){
    let rawData =  fs.readFileSync('./database/google_cred.json');
    let credentials = JSON.parse(rawData);
    return credentials;
}

function parseEmail(email){
    let id = email.split('@');
    return id[0];
}


function setupPassport(passport){
    const credentials = getGoogleCred();
    passport.use(new GoogleStrategy({
        clientID: credentials.web.client_id,
        clientSecret: credentials.web.client_secret,
        callbackURL: "/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
            let user = {
                id: parseEmail(profile.emails[0].value),
                name: profile.displayName
            };
            console.log(user);
            cb(null, user);
        })
    );

    // send user ID, 
    // Return DB user when deserialized
    passport.serializeUser(function(user, cb) {
        cb(null, user);
      });
    
    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
      });
    

}

// exports
module.exports = { setupPassport };
