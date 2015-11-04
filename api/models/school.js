var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SchoolSchema   = new Schema({
	province: String,
    city: String,
    name: String,
    schoolType: String,
    area: String,
    level: String,
    phone: [],
    review: [],
    address: String,
    logo: String,
    catagery: String,
    introduction: String 
});

module.exports = mongoose.model('School', SchoolSchema);
