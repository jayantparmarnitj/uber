
'use strict';
module.exports = function(app) {
  var controller = require('../controllers/indexController');

app.all('/driverGps',controller.find_driver);
//app.post('/verifyOtp',controller.verify_otp);
app.get('/',controller.list_card_data);

};