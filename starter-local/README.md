# Passport Local Strategy 

Your task here is to build a super simple Express server with passport for authentication

## Requirements

1. Your server should also expose **ONE** api endpoint - a GET request to `/api/info` which will return some text in json.
2. THis endpoint should be protected by passport's local strategy authentication. If session is not authenticated, do not return the proper payload from `/api/info`

## Notes

1. The frontend is mostly built for you. In the `login.html`, you must implement the `POST` call when user clicks on the login button.
2. As it stands now, if user is not logged in, frontend will redirect to the login page.
3. For now, username and pw are both set to `guest`.

## API docs

Here are the relevant API docs you might need.

### `/api/info`

This endpoint will return some text encased in a JSON payload.

#### Returnable

If user is authenticated:

```json
{
    "message": "Hello, Wrold!",
    "success": true
}
```

Otherwise:

```json
{
    "sucess": false
}
```

#### Example Usage

```bash
$ curl -X GET "http://localhost:3000/api/info"
```

## Local Strategy Docs

The most common / useful strategy to use is the local strategy.

This will require setting up FE routes for signup / login as well. 

## Packages

```bash
npm install --save passport passport-local express-session
```

## How to Install

Here are the steps you would need to implement passport with the local strategy

### 1

Begin by including passport and your local strategy:

```js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
```

### 2

Then, tell passport how to serialize and deserialize your user object

Effectively, you can choose to store a user id or something to your session and have passport automatically give you the user object you need from it.

For our purposes, we will access the user object directly.

```js
passport.serializeUser((user, done) => {
    console.log('HERE', Object.assign(user, {foo: 1}));
    done(null, user)
});
passport.deserializeUser((user, done) => {
    done(null, user)
});
```

### 3

Let's now define our strategy.

This is the logic we would use to determine and validate a user in our DB based on the log in credentials

```js
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    console.log('in localstrategy');
    console.log(email, password);
    if (!email || !password) {
        return done('f-ed up', {}, {});
    }

    return done(null, {success: true});
}));
```

### 4

Now, let's initialize some stuff in passport.

**Important**: you'll need to also use **express-session** middleware here

```js
app.use(passport.initialize());
app.use(passport.session());
```

### 5

Finally, let's define how login implementation should work in an actual route.

```js
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

```

### 6

Test! Write a frontend that you can use to **POST** to the route you defined. Ensure that logging in works by console.logging all over the place. If it works out properly, you should see `{"sucess": true}` in your route response payload.
"
