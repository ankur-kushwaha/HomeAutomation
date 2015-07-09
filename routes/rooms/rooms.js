var express = require('express');
var RoomModel = require("./RoomModel");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("inside get rooms")

    RoomModel.find(function(err, Rooms) {
        if (err) return console.error(err);
        res.json({
            "rooms": Rooms
        });
    })

    /*    var db = req.db;
        db.collection('room').find().toArray(function(err, result) {
            if (err) throw err;
            res.json({
                "rooms": result
            });
        });*/
});


router.post('/', function(req, res, next) {
    console.log("inside post rooms")

    var room = new RoomModel(req.body);

    room.save(function(err, room) {
        if (err) return console.error(err);
        res.json(room);
    })

    /*var db = req.db;
    db.collection('room').insert(req.body, function(err, result) {
        if (err) throw err;
        if (result) console.log('Added!');
        res.json(result);
    });*/

});

module.exports = router;
