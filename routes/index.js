
'use strict';
module.exports = function(app) {
  var controller = require('../controllers/indexController');

app.all('/driverGps2',controller.find_nearest_drivers2);
app.all('/driverGps5',controller.find_nearest_drivers5);
app.all('/driverGps10',controller.find_nearest_drivers10);
app.all('/allDrivers',controller.find_all_drivers);
//app.all('/driverSignup',controller.drivers_signup);
// app.all('/userLogin',controller.user_login);
// app.all('/driverLogin',controller.driver_login);
//app.post('/verifyOtp',controller.verify_otp);
app.get('/',controller.list_card_data);

};