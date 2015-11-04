var express = require('express');
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('**** Request for ' + req.path);
    next(); // make sure we go to the next routes and don't stop here
});
mongoose = require('mongoose');
var uri = 'mongodb://127.0.01:27017/greatschool';

var testUri = 'mongodb://127.0.01:12345/greatschool';  // this is test db
db = mongoose.connect(testUri);

var School     = require('../models/school');

//if query param is "" or 全部 ，do not filter db on the field
router.route('/schools')
    .get(function(req, res) {
        var queryParam ={};
        if(req.query.name && req.query.name!="全部") { queryParam.name = req.query.name;    }
        if(req.query.province && req.query.province!="全部") { queryParam.province = req.query.province;    }
        if(req.query.city && req.query.city!="全部") { queryParam.city = req.query.city;    }
        if(req.query.area && req.query.area != "全部" ) { queryParam.area = req.query.area;    }
        if(req.query.schoolType && req.query.schoolType != "全部" ) { queryParam.schoolType = req.query.schoolType;    }
        if(req.query.category && req.query.category != "全部"  ) { queryParam.catagery = req.query.category;    } //todo , change catagery to category in mongodb
        if(req.query.level && req.query.level != "全部" ) { queryParam.level = req.query.level;    }
        var query = School.find(queryParam);
        query.exec(function (err, docs) {
            res.send(docs);
        });
    })
    //create a school 
    .post(function(req,res){
        var school = new School;
        setSchool(school, req.body);
        console.log("******");
        console.log(school);
        school.save(function(err){
            if(err)
                res.send(err);
            else
                res.json({message: 'school created!'});
        });
    });


function notInclude(arr,obj) {
    return (arr.indexOf(obj) == -1);
}
router.route('/schoolField/:queryField')
    .get(function(req, res) {
        console.log("inside router /schools:queryField");
        var field = req.params.queryField
        var query = School.find({}).select(field);
        query.exec(function (err, result) {
            if (err) return next(err);
             var arr =[]
            for (var i =0; i < result.length; i++)
            {
                var value = result[i][field]
                if(value && notInclude(arr, value))
                {
                    arr.push( value );
                }
            }
        
            res.send(arr);
        });
    });

router.route('/schools/:id')
    // get school info with the id
    .get(function(req, res){
        School.findById(req.params.id, function (err, school) {
          res.send(school);
        });  
    })
    //update the school info with the id
    .put(function (req, res) {
        School.findById(req.params.id, function (err, school) {
            if(err)
                res.send(err);
            setSchool(school, req.body);
            // save back 
            school.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'school updated!' });
            });
        });  
    })
     // delete school with this id
    .delete(function(req, res) {
        School.remove({
            _id: req.params.id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


router.route('/schools/:id/:field')
    .get(function(req, res){
        var field = req.params.field;
        var query = School.findById(req.params._id).select(req.params.field);
        query.exec(function (err, docs) {
           res.send(docs);
        });
    });


var setSchool = function(school, body){
        if(body.name) 
            school.name =  body.name;
        if(body.province)
            school.province = body.province;
        if(body.city)
            school.city = body.city;
        if(body.schoolType)
            school.schoolType = body.schoolType;
        if(body.area)
            school.area = body.area;
        if(body.level)
            school.level = body.level;
        if(body.address)
            school.address = body.address;
        if(body.logo)
            school.logo = body.logo;
        if(body.catagery)
            school.catagery = body.catagery;
        if(body.introduction)
            school.introduction = body.introduction;
        if(body.phone)
            school.phone.push(body.phone);
        if(body.review)
            school.review.push(body.review);

}

module.exports = router;
