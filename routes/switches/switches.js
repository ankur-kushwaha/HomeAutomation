var express = require('express');
var router = express.Router();
var RoomModel = require("../rooms/RoomModel");

/* GET home page. */
router.get('/', function(req, res, next) {

});


router.post('/', function(req, res, next) {



    console.log("inside post switch");
      var switchName = req.body.switchName;
    RoomModel.findByIdAndUpdate(req.body.roomId, {$push: {"switch":{name:switchName}}}, function(err, user) {
        if (err) throw err;

        // we have the updated user returned to us
        console.log(user);
        res.json("true");
    });
    /*var db=req.db;
        

        console.log("inside post switch");
        console.log("inside post switch");
        var roomId = req.body.roomId;
        var switchName = req.body.switchName;
        var col=db.collection('room')

        col.update({
            _id: new ObjectID(roomId)
        }, {
            '$push': {
                switch: {name:switchName} 
            }
        }, function(err) {
            if (err) throw err;
            callback(true);
        });*/
});

module.exports = router;
