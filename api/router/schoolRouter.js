var express = require('express');
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

var School     = require('../models/school');
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

router.route('/schools/:id')
    .get(function(req, res){
        School.findById(req.params.id, function (err, schoolDocument) {
          res.send(schoolDocument);
        });  
    });


module.exports = router;
