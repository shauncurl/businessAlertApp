"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.post("/alert", function(req, res) {
  if(req.body!=''){
    /*
    var alertNum = req.body.queryResult.parameters.alertNumber
    var url = "http://69.28.75.149:3000/api/getData/?businessNumberIN="+alertNum;
    
    request(url, function (error, response, body) {
      var result = JSON.parse(body);
      var busNum_res = result['businessNumberIN'];
      var accountManager = result['accountManager']
      //res.send(result['businessNumberIN']);
    }); 
    var speech = "the account manager is listed as "+accountManager;
    */
    var speech = "You have entered the alert number of ";
  }
  else{
     var speech = "I am having trouble understanding the alert number. Tell me again.---Testing..."; 
  }
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-BA-alert-test"
  });  
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

function externalCall(url){
  request(url, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
}
