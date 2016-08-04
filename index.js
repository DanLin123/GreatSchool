var express = require('express');
var School = require('./models/school');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var multer  = require('multer')
var mongodb = require("mongodb");
var app = express();
var router = express.Router(); 


// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var uri = process.env.MONGODB_URI || 'mongodb://heroku_4q70n482:tfo6for71jhjfqjit9bhhnlrob@ds139655.mlab.com:39655/heroku_4q70n482';
mongoose.connect(uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongodb!');

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
        console.log("App now running on port", port);
    });
});



router.route('/')
    .get(function(req, res){
        res.send('use api/schools to check all schools');
    })

router.route('/schools')
    .get(function(req, res) {
        var p = School.find();
        if(req.query.name ) {p = p.where('name').equals(req.query.name)};
        if(req.query.city) {p = p.where('city').equals(req.query.city)};
        if(req.query.area) {p = p.where('area').in(req.query.area.split(','))};
        if(req.query.level) {p = p.where('level').in(req.query.level.split(','))};
        if(req.query.type) {p = p.where('type').in(req.query.type.split(','))};
        p.exec(function (err, results) {
            res.send(results);
        });

    })
    .post(function(req,res){
        var school = new School();
        var data = req.body;
        school.name = data.name;
        school.city = data.city;
        school.type = data.type;
        school.area = data.area;
        school.phone = data.phone;
        school.reviews = data.reviews;
        school.address = data.address;
        school.logo = data.logo;
        school.introduction = data.introduction;
        school.level = data.level;

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

router.route('/schoolNames/:city')
    .get(function(req, res) {
        console.log(req.params)
        var query = req.params.city ? {city:req.params.city} : null;
        School.find(query).distinct('name', function(err, names){
            res.send(names);
        });
    });



router.route('/cities')
    .get(function(req, res) {
        School.find().distinct('city', function(err, cities){
            res.send(cities);
        });     
    })

router.route('/areas/:city')
    .get(function(req, res) {
        var query = req.params.city ? {city:req.params.city} : null;
        School.find(query).distinct('area', function(err, areas){
            res.send(areas);
        });     
    })

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

router.route('/gallery/:id')
    .post(function (req, res, next) {
        var sub_folder = req.params.id;
        var storage = multer.diskStorage({
            destination: 'uploads/' + sub_folder
        });
        var upload = multer({ storage : storage}).any();

        upload(req,res,function(err) {
            if(err) {
                return res.end("Error uploading file.");
            } else {
                var f_paths = [];
                req.files.forEach( function(f) {
                    f_paths.push({'image':f.path});
                });
                res.end(JSON.stringify(f_paths));
            }
    });
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '5mb'}));
app.use('/api',router);
app.use(express.static(__dirname + '/public'));
module.exports = router;

