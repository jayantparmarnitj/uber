'use strict';
var mysql      = require('mysql');
// var dname,long,lat,flag=0;
// var arr=[];
//const Resbody={};
// var mongoose = require('mongoose'),
//   Task = mongoose.model('driver_gps');
exports.list_card_data = function(req, res) {
  res.json({"hello":"jayant"});
};

exports.find_all_drivers = function(req, res) {
  try{
    var dname,long,lat,flag=0;
    var arr=[];
    const driverName = JSON.stringify(req.body.driverName);
    const Flongitude = JSON.stringify(req.body.longitude);
    const Flatitude = JSON.stringify(req.body.latitude);
    console.log("Flongitude: "+Flongitude);
    console.log("Flatitude: "+Flatitude);
  var db_config = {
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
};
  
  var connection;
  connection = mysql.createConnection(db_config); 
  function handleDisconnect() {
      console.log('1. connecting to db:');
     
     
  
      connection.connect(function(err) {              
          if (err) {                                    
              console.log('2. error when connecting to db:', err);
           // throw err;

              setTimeout(handleDisconnect, 5000); 
          }
          else{



            var min = 100000000;
            var radius=10;
            var sql = "select * from driver_gps"
            connection.query(sql, function (err, result) 
             {
                    if (err) 
                         throw err;
                     if(result.length){
                    
                   return res.status(200).json(result);
                 
                  }
               
               
             });
          }

      });                                   

      connection.on('error', function(err) {
          console.log('3. db error', err);
          if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            flag=1;
           
              handleDisconnect();                      	
          } else {                                      	
              throw err;                                  
          }
      });
  }
  
  handleDisconnect();
    }
  catch(e){
    return res.status(500).json({success:0,msg:e.message});
  }
};


exports.find_nearest_drivers = function(req, res) {
  try{
    var dname,long,lat,flag=0;
var arr=[];
    const driverName = JSON.stringify(req.body.driverName);
    const Flongitude = JSON.stringify(req.body.longitude);
    const Flatitude = JSON.stringify(req.body.latitude);
    console.log("Flongitude: "+Flongitude);
    console.log("Flatitude: "+Flatitude);

  //   var db_config = {
  //     host     : 'us-cdbr-iron-east-05.cleardb.net',
  //     user     : 'b37b1bb4aa4cc9',
  //     password : '2a1767d4',
  //     database : 'heroku_ed303c50642e20d'
  // };

  var db_config = {
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
};
  
  var connection;
  connection = mysql.createConnection(db_config); 
  function handleDisconnect() {
      console.log('1. connecting to db:');
     
     
  
      connection.connect(function(err) {              
          if (err) {                                    
              console.log('2. error when connecting to db:', err);
           // throw err;

              setTimeout(handleDisconnect, 5000); 
          }
          else{



            var min = 100000000;
            var radius=10;
            var sql = "select * from driver_gps"
            connection.query(sql, function (err, result) 
             {
                    if (err) 
                         throw err;
                     if(result.length){
                          for(var i = 0; i<result.length; i++ ){
                       if(Math.sqrt(Math.pow((Flongitude-result[i].longitude), 2) + Math.pow((Flatitude-result[i].latitude), 2))<= min && min>radius)
                       {
                         min=Math.sqrt(Math.pow((Flongitude-result[i].longitude), 2) + Math.pow((Flatitude-result[i].latitude), 2));
                         dname=result[i].driverName;
                         long=result[i].longitude;
                         lat=result[i].latitude;
                         arr.push(result[i]);
                       }
                     }
                     const Resbody = {
                       "driverName":dname,
                       "longitude":long,
                       "latitude":lat
                     }
                     //console.log("Resbody"+ {Resbody});
                   //return res.send({Resbody});
                  //if(flag==0)
                   return res.status(200).json(arr);
                 
                  }
               
               
             });
          }

      });                                   

      connection.on('error', function(err) {
          console.log('3. db error', err);
          if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            flag=1;
           
              handleDisconnect();                      	
          } else {                                      	
              throw err;                                  
          }
      });
  }
  
  handleDisconnect();

    // var con = mysql.createConnection({
    //   host     : 'us-cdbr-iron-east-05.cleardb.net',
    //   user     : 'b37b1bb4aa4cc9',
    //   password : '2a1767d4',
    //   database : 'heroku_ed303c50642e20d'
    // });
    // con.connect(function(err) {
    //   if (err) throw err;
    //   console.log("Connected!");

    //   var min = 100000000;
    //  var sql = "select * from driver_gps"
    //   con.query(sql, function (err, result) 
    //   {
    //          if (err) 
    //               throw err;
    //           if(result.length){
    //                for(var i = 0; i<result.length; i++ ){
    //             if(Math.sqrt(Math.pow((Flongitude-result[i].longitude), 2) + Math.pow((Flatitude-result[i].latitude), 2))<= min)
    //             {
    //               min=Math.sqrt(Math.pow((Flongitude-result[i].longitude), 2) + Math.pow((Flatitude-result[i].latitude), 2));
    //               dname=result[i].driverName;
    //               long=result[i].longitude;
    //               lat=result[i].latitude;
    //             }
    //           }
    //           const Resbody = {
    //             "driverName":dname,
    //             "longitude":long,
    //             "latitude":lat
    //           }
    //           //console.log("Resbody"+ {Resbody});
    //         //return res.send({Resbody});
    //         return res.status(200).json({Resbody});
    //        }
        
        
    //   });
      
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















   // con.connect(function(err) {
    //   if (err) throw err;
    //   console.log("Connected!");
    //   //var sql = "CREATE TABLE driver_gps (driverName VARCHAR(255), longitude VARCHAR(255), latitude VARCHAR(255))";
    //   //var sql = "drop table driver_gps";
    //   var sql = "select * from driver_gps";
    //  //var sql = "INSERT INTO driver_gps (driverName, longitude, latitude) VALUES ("+driverName+", "+Flongitude+", "+Flatitude+")";
    //   con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("inserted  "+result);
    //     res.send([result]);
    //   });
    // });






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