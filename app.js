"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 3000;
const request = require("request");

app.post("/hello", (req, res) =>{
 
  const url = "https://control.msg91.com/api/sendhttp.php"
  const options = {
    authkey: process.env.MSG91_APIKEY,
    mobiles: req.body.mobile,
    message: req.body.message,
    sender: "TESTMG",
    route: 4,
    country: 91
  }
  request({url: url, qs: options}, function(err, response, body){
    if(err) console.log(err);
    else {
      if(response.statusCode == 200){
          res.send({receipt: body, phone: mobile})
        }
      }
    });
});

app.listen(port, () =>{
  console.log("Listening on port: ", port);
});
