const express = require('express');
const app = express();

app.use('/', express.static('./public'));

app.get('/api/info', (request, response) => {
	response.header('Content-Type', 'application/json');
	response.send({
	    "success": false
	});
    // UNCOMMENT code below when you have achieved 
    // authentication with passport
    /*
	response.send({
	    "message": "Hello, Wrold!",
	    "success": true
	});
    */

});

app.listen(3003, () => {
	console.log('LOL')
});
