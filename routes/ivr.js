var express = require('express');
var router = express.Router();
var twilio = require('twilio');

// POST: '/ivr/welcome'
router.post('/welcome', twilio.webhook({validate: false}), function (request, response) {
    var twiml = new twilio.TwimlResponse();
    twiml.gather({
        action: "/ivr/menu",
        numDigits: "1",
        method: "POST"
    }, function (node) {
        node.say("Welcome, please choose one of the following options. " + 
              "Press 1 to transfer to User 1. " + 
              "Press 2 to hang up. " +
              "Press 0 to speak to an operator. ", 
              {voice: "alice", language: "en-GB", loop: 3 });
    });
    response.send(twiml);
});

// POST: '/ivr/menu'
router.post('/menu', twilio.webhook({validate: false}), function (request, response) {
    var selectedOption = request.body.Digits;
    var optionActions = {
        "1": transferToUserOne,
        "2": hangUp,
        "0": speakToOperator
    };
    //If user selected one of the options
    if (optionActions[selectedOption]) {
        var twiml = new twilio.TwimlResponse();
        optionActions[selectedOption](twiml);
        response.send(twiml);
    }
    else {
        response.send(redirectWelcome());
    }
});


var transferToUserOne = function (twiml) {
    twiml.say("Transfering to user one.",
        {voice: "alice", language: "en-GB"});

    var tempNum = "+5122965489";
    twiml.dial(tempNum);

    return twiml;
};

var speakToOperator = function (twiml) {
    twiml.say("Transfering to operator.",
        {voice: "alice", language: "en-GB"});

    var tempNum = "+12024173378";
    twiml.dial(tempNum);

    return twiml;
};


var hangUp = function (twiml) {
    twiml.say("Goodbye.",
        {voice: "alice", language: "en-GB"});

    twiml.hangup();

    return twiml;
}

var redirectWelcome = function () {
    var twiml = new twilio.TwimlResponse();

    twiml.say("Returning to the main menu", {voice: "alice", language: "en-GB"});
    twiml.redirect("/ivr/welcome");
    
    return twiml;
};

module.exports = router;
