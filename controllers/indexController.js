'use strict';
var mysql      = require('mysql');
// var mongoose = require('mongoose'),
//   Task = mongoose.model('driver_gps');
exports.list_card_data = function(req, res) {
  res.json({"hello":"jayant"});
};

exports.find_driver = function(req, res) {
  try{
    const driverName = JSON.stringify(req.body.driverName);
    const Flongitude = JSON.stringify(req.body.longitude);
    const Flatitude = JSON.stringify(req.body.latitude);
    console.log("longitude: "+Flongitude);
    console.log("latitude: "+Flatitude);

    // var connection = mysql.createConnection({
    //   host     : 'us-cdbr-east-04.cleardb.com',
    //   user     : 'b37b1bb4aa4cc9',
    //   password : '2a1767d4',
    //   database : 'heroku_ed303c50642e20d'
    // });
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "uberDb"
    });
    
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var arr = [];
      var min = 100000000;
      var dname,long,lat;
      //var sql = "CREATE TABLE driver (driverName VARCHAR(255), longitude VARCHAR(255), latitude VARCHAR(255))";
     //var sql= "INSERT INTO driver_gps (driverName, longitude, latitude) VALUES ("+driverName+", "+Flongitude+", "+Flatitude+")";
     var sql = "select * from driver_gps"
      con.query(sql, function (err, result) {
        if (err) throw err;
        if(result.length){
          for(var i = 0; i<result.length; i++ ){     
                if(Math.sqrt(Math.pow((Flongitude-result[i].longitude), 2) + Math.pow((Flatitude-result[i].latitude), 2))<= min)
                {
                  min=Math.sqrt(Math.pow((Flongitude-longitude), 2) + Math.pow((Flatitude-latitude), 2));
                  dname=result[i].driverName;
                  long=rerult[i].longitude;
                  lat=result[i].latitude;
                }
                          arr.push(result[i]);
              }
           }
        console.log("name database data",arr);
        return res.send([result[0],result[1]]);
      });
      
    });
 
// const Resbody={
//   "data":arr
// }
   // return res.send({Resbody});
    //return res.status(200).json({success:1, msg:`success ${arr}`});

    // Task.findOne("Math.sqrt(Math.pow((Flongitude-longitude), 2) + Math.pow((Flatitude-latitude), 2))>="+ min +": min=Math.sqrt( Math.pow((Flongitude-longitude), 2) + Math.pow((Flatitude-latitude), 2)) ? "+min+"",function (err, data) {

    //   if (err) 
    //     return console.log(err);
    //   else if (data)
    //   {
    //       console.log("database data:"+data);
    //       const dbLongitude=data.longitude;
    //       const dbLatitude=data.latitude;
    //       const name = data.driverName;
    //       const Resbody = {
    //         "driverName":name,
    //         "longitude":dbLongitude,
    //         "latitude":dbLatitude
    //       }
    //     return res.send({Resbody});
    //       //return res.status(200).json({success:1, msg:`Success: nearest driver: ${name}, Longitude: ${dbLongitude} and Latitude: ${dbLatitude}`});
    //       //return res.status(200).json({"driverName":name,"longitude":dbLongitude,"latitude":dbLatitude});
    //   }
    //   else
    //   return res.status(200).json({success:1, msg:"Service available only in chandigarh"});
      
    // });

    }
  catch(e){
    return res.status(500).json({success:0,msg:e.message});
  }
};

// exports.create_charge = function(req, res) {

// try{
//   console.log(req.body);
//  var code = Math.floor((Math.random()*1000000)+1);
//   const accountSid = 'AC5cce3ad6245f9d26361fc1430275274a';
//   const authToken = 'd569dcea18aa69d7ed19d2dfa35fc6dc';
//   const client = require('twilio')(accountSid, authToken);
//   const mobile = req.body.cardNum;

//   client.messages.create(
//     {
//       to: `${mobile}`,
//       from: '+13015473283',
//       body: `Jayant Your OTP is ${code}`,
//     },
//     (err, message) => {
//       if(err)        
//         return res.status(200).json({success:0,msg:err.message});
//       else
//         {
//           console.log(message.sid);
//           var new_task = new Task({
//             mobileNum:mobile,
//             Otp:code
//            });
//            new_task.save(function(err, task) {
//              if (err)
//                res.send(err);
//             // res.json(task);
//              console.log('MobileNum and Otp saved successfully!');
//            });
//           return res.status(200).json({success:1, msg:"Otp Sent Successfully"});
          
//         }

//     }
//   );

// }
// catch(e){
//   return res.status(500).json({success:0,msg:e.message});
// }

// }