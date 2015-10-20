var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SchoolSchema   = new Schema({
	province: String,
    city: String,
    name: String,
    schoolType: String,
    area: String,
    level: String,
    address: String,
    logo: String,
    catagery: String 
});

module.exports = mongoose.model('School', SchoolSchema);
