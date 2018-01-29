var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    driverName:  String,
              gps:  String
});

module.exports = mongoose.model('driver_gps', schema);