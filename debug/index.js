/*
 * pull in server
 */

const express = require('express');
 
/*
 * pull in authorization requirements
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/*
 * pull in middlewares
 */
const expressSession = require('express-session');
const parser = require('body-parser');

/*
 * implementation
 */
const app = express();

/*
 *	implement middlewares
 */
app.use(expressSession({
	secret: 'FOBAR'
}));
app.use(parser.json())

/*
 * implement passport methods
 */
passport.serializeUser((user, done) => {
    //done(null, user)
});
passport.deserializeUser((user, done) => {
    done(null, user)
});

/*
 *	passport strategies, middleware
 */
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    if (!email || !password) {
        return done('f-ed up', {}, {});
    }

    return done(null, {user: 'Taq'});
}));

/*
 *	initialize passport
 */
app.use(passport.initialize());
app.use(passport.session());

/*
 * login route
 */
app.post('/auth/login', (request, response, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) console.log(err);
        if (!user) console.log(user);

        request.logIn(user, (err) => {
            if (err) return next(err);
            // if we are here, user has logged in!
            response.header('Content-Type', 'application/json');

            response.send({
                success: true,
            });
        });
    })(request, response, next);

});



app.use('/', express.static('./public'));

app.get('/api/info', (request, response) => {

	response.header('Content-Type', 'application/json');
	response.send({
	    "message": "Hello, Wrold!",
	    "success": true
	});

});

app.listen(3003, () => {
	console.log('LOL')
});
