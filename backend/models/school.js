var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SchoolSchema   = new Schema({
	province: String,
    city: String,
    name: String,
    schoolType: String,
    area: String,
    phone: [],
    reviews: [],
    address: String,
    logo: String,
    introduction: String 
});

module.exports = mongoose.model('School', SchoolSchema);
