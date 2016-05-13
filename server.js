// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var publicDir = require('path').join(__dirname, '/publish');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


var schoolApiRouter = require('./api/router/schoolRouter');
app.use('/api', schoolApiRouter);
app.use(express.static(publicDir));


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

//test
