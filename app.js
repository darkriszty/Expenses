var express = require('express');
var path = require('path');

var portNumber = 3000;

var app = express();

app.set('port', portNumber);
app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(portNumber, function() {
	console.log('Server started');
});
