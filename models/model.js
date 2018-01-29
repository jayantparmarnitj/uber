var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    driverName:  String,
     longitude:  String,
     latitude: String
});

module.exports = mongoose.model('driver_gps', schema);