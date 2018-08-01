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
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.alertNumber
      ? req.body.result.parameters.echoText
      : "I am having trouble understanding the alert number. Tell me again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-BA-alert-test"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
