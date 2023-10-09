import passport from "passport";
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
var opts :any = {};
import User from "../../../../database/models/user";
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'weljmwieuilsdcpoavqwebcskdiutregbc';
passport.use(new JwtStrategy(opts, function(jwt_payload:any, done:any) {
    console.log("here", jwt_payload);
    User.findOne({email: jwt_payload.email}).then((user:any) => {
        
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    }).catch((err:any)=>{
        if (err) {
            return done(err, false);
        }
    })
}));