var express = require('express');
var School = require('./models/school');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var app = express();
var router = express.Router(); 

var uri = 'mongodb://127.0.0.1:27017/test';
mongoose.connect(uri);

// middleware to use for all requests
router.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/')
    .get(function(req, res){
        res.send('use api/schools to check all schools');
    })

router.route('/schools')
    .get(function(req, res) {
        console.log(req.query.schoolType + "*****");
        console.log(req.query.name + "name*****");
        var queryParam ={};
        if(req.query.name ) { queryParam.name = req.query.name;    }
        if(req.query.province) { queryParam.province = req.query.province;    }
        if(req.query.city) { queryParam.city = req.query.city;    }
        if(req.query.area) { queryParam.area = req.query.area;    }
        if(req.query.schoolType) { queryParam.schoolType = req.query.schoolType;    }
        if(req.query.category) { queryParam.catagery = req.query.category;    } //todo , change catagery to category in mongodb
        var query = School.find(queryParam);
        query.exec(function (err, docs) {
            res.send(docs);
        });
    })
    .post(function(req,res){
        var school = new School();
        var data = req.body;
        school.name = data.name;
        school.province = data.province;
        school.city = data.city;
        school.schoolType = data.schoolType;
        school.area = data.area;
        school.phone = data.phone;
        school.reviews = data.reviews;
        school.address = data.address;
        school.logo = data.logo;
        school.introduction = data.introduction;

        school.save(function(err){
            if(err)
                res.send(err);
            else
                res.json({message: 'school created!'});
        });
    });


router.route('/schools/:id')
    .get(function(req, res){
        School.findById(req.params.id, function (err, school) {
          res.send(school);
        });  
    })
    .patch(function(req, res){
        var query = { _id: req.params.id};
        School.findOneAndUpdate(query, req.body, function(err){
            if(err)
                res.send(err);
            else
                res.json({message: 'school updated!'});
        })
    })
    .delete(function(req, res) {
        School.remove({
            _id: req.params.id
        }, function(err, bear) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/schoolNames')
    .get(function(req, res) {
        School.find().distinct('name', function(err, names){
            res.send(names);
        });
    });

router.route('/areas')
    .get(function(req, res) {
        School.find().distinct('area', function(err, areas){
            res.send(areas);
        });     
    })

router.route('/schoolTypes')
    .get(function(req, res) {
        School.find().distinct('schoolType', function(err, schoolTypes){
            res.send(schoolTypes);
        });     
    })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api',router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = router;
