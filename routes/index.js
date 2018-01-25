// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;


'use strict';
module.exports = function(app) {
  var controller = require('../controllers/indexController');

app.post('/otp',controller.create_charge);
app.post('/verifyOtp',controller.verify_otp);
app.get('/',controller.list_card_data);

};