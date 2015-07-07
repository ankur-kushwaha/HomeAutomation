var express = require('express');
var roomService = require("./roomService");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("inside get rooms")
    var db = req.db;
    db.collection('room').find().toArray(function(err, result) {
        if (err) throw err;
        res.json({"rooms":result});
    });/*
    roomService.getRooms(db, function(data) {
        res.json({"rooms":data});
    })*/
});


router.post('/', function(req, res, next) {
    console.log("inside post rooms")
    roomService.addRoom(req, res);

});

module.exports = router;
