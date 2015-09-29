// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var publicDir = require('path').join(__dirname, '/app');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API


// =============================================================================
var router = express.Router();              // get an instance of the express Router
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
mongoose = require('mongoose');
var uri = 'mongodb://admin:admin@ds053638.mongolab.com:53638/greatschool';
db = mongoose.connect(uri);

var School     = require('./app/models/school');
router.route('/schools')
    .get(function(req, res) {
        School.find(function(err, schools) {
            if (err)
                res.send(err);

            res.json(schools);
        });
    });

router.route('/schools/name')
    .get(function(req, res) {
        var query = School.find({}).select('name -_id');
        query.exec(function (err, schoolNames) {
            if (err) return next(err);
             var arr =[]
            for (var i =0; i < schoolNames.length; i++)
            {
                arr.push( schoolNames[i].name );
            }
        
            res.send(arr);
        });
    });
app.use('/api', router);


app.use(express.static(publicDir));




// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);