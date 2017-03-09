var express = require('express')
  , router = express.Router()
  , twilio = require('twilio');

var accountSid = 'ACe4c44d43d09dc9d4ef3ca8c7247c437f';
var authToken = "eb8afc6693084bcabddd0499e69ecf70";
var client = require('twilio')(accountSid, authToken);


// GET: /users
router.get('/', function (req, res) {
  console.log("got to users");
  client.calls.list(function(err, data){
    console.log("Caller Number: " + data.calls[0].from);
    console.log("Duration: " + data.calls[0].duration);
});
});

// POST: /agents/call
/*router.post('/call', twilio.webhook({validate: false}), function (req, res) {
  if (req.body.CallStatus === 'completed') {
    return res.send('');
  }

  var twiml = new twilio.TwimlResponse();
  twiml
    .say('It appears that no agent is available. ' +
         'Please leave a message after the beep',
         { voice: 'alice', language: 'en-GB' })
    .record({
      maxLength: 20,
      action: '/agents/hangup',
      transcribeCallback: '/recordings?agentId=' + req.query.agentId
    })
    .say('No record received. Goodbye',
        { voice: 'alice', language: 'en-GB' })
    .hangup();

  res.send(twiml.toString());
});

// POST: /agents/hangup
router.post('/hangup', twilio.webhook({validate: false}), function (req, res) {
  var twiml = new twilio.TwimlResponse();
  twiml
    .say('Thanks for your message. Goodbye',
         { voice: 'alice', language: 'en-GB' })
    .hangup();

  res.send(twiml.toString());
});

// POST: /agents/screencall
router.post('/screencall', twilio.webhook({validate: false}), function (req, res) {
  var twiml = new twilio.TwimlResponse();
  twiml
    .gather({
      action: '/agents/connectmessage',
      numDigits: '1',
    }, function () {
      this
        .say(spellPhoneNumber(req.body.From))
        .say('Press any key to accept');
    })
    .say('Sorry. Did not get your response')
    .hangup();

  res.send(twiml.toString());
});

// POST: /agents/connectmessage
router.post('/connectmessage', twilio.webhook({validate: false}), function (req, res) {
  var twiml = new twilio.TwimlResponse();
  twiml
    .say('Connecting you to the extraterrestrial in distress');

  res.send(twiml.toString());
});

var spellPhoneNumber = function (phoneNumber) {
  return phoneNumber.split('').join(',');
};
*/
module.exports = router;