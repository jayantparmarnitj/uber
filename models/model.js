var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    mobileNum:  String,
    Otp:  String
});

module.exports = mongoose.model('TwilioOtp', schema);