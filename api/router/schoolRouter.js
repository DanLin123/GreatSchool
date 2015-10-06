var express = require('express');
var router = express.Router();              // get an instance of the express Router
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('###### Request for ' + req.path);
    next(); // make sure we go to the next routes and don't stop here
});
mongoose = require('mongoose');
var uri = 'mongodb://admin:admin@ds053638.mongolab.com:53638/greatschool';
db = mongoose.connect(uri);

var School     = require('../models/school');

router.route('/schools')
    .get(function(req, res) {
        var queryParam ={};
        if(req.query.name ) { queryParam.name = req.query.name;    }
        if(req.query.province ) { queryParam.province = req.query.province;    }
        if(req.query.city ) { queryParam.city = req.query.city;    }
        if(req.query.area ) { queryParam.area = req.query.area;    }
        if(req.query.schoolType ) { queryParam.schoolType = req.query.schoolType;    }
        if(req.query.level ) { queryParam.level = req.query.level;    }
        if(req.query.category ) { queryParam.catagery = req.query.category;    }  //todo , change catagery to category in mongodb
        var query = School.find(queryParam);
        query.exec(function (err, docs) {
            res.send(docs);
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

router.route('/schools/:id/:field')
    .get(function(req, res){
        var field = req.params.field;
        var query = School.findById(req.params.id).select(req.params.field);
        query.exec(function (err, docs) {
           res.send(docs);
        });
    });


module.exports = router;
