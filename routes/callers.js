var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var Caller = require('../models/callers');

var accountSid = 'ACe4c44d43d09dc9d4ef3ca8c7247c437f';
var authToken = "eb8afc6693084bcabddd0499e69ecf70";
var client = require('twilio')(accountSid, authToken);


// POST: /callers
router.post('/', function (req, res) {
  client.calls.list(function(err, data){
    var caller = new Caller({
        phoneNumber: data.calls[0].from,
        duration: data.calls[0].duration,
        startTime: data.calls[0].startTime,
        endTime: data.calls[0].endTime
    });

    caller.save()
    .then(function () {
      res.status(200).send('Caller record created');
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).send('Could not create a caller record');
    });;
  });
});

module.exports = router;