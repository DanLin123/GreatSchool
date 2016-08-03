var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SchoolSchema   = new Schema({
    city: String,
    name: String,
    type: String,
    area: String,
    phone: [],
    reviews: [],
    address: String,
    logo: String,
    introduction: String,
    level:String, 
    gallery: []
});

module.exports = mongoose.model('School', SchoolSchema);
