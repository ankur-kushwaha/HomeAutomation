var express = require('express');
var switchService = require("./switchService");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

});


router.post('/', function(req, res, next) {
var db=req.db;
    console.log("inside post switch");
    var roomId = req.body.roomId;
    var switchName = req.body.switchName;
    switchService.addSwitch(db, roomId, switchName, function(data) {
        res.json(data);
    });
});

module.exports = router;
