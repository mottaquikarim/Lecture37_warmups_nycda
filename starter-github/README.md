# Passport Github Strategy 

Your task here is to build a super simple Express server with passport for authentication

## Requirements

1. Your server should also expose **ONE** api endpoint - a GET request to `/api/info` which will return some text in json.
2. THis endpoint should be protected by passport's github strategy authentication. If session is not authenticated, do not return the proper payload from `/api/info`

## Notes

1. The frontend is mostly built for you. In the `login.html`, you must implement the `POST` call when user clicks on the login button.
2. As it stands now, if user is not logged in, frontend will redirect to the login page.

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

## Github Strategy Docs

Check out this **[tutorial](https://www.jokecamp.com/tutorial-passportjs-authentication-in-nodejs/)** for github strategy docs.
