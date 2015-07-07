var switchService = {};
var ObjectID = require('mongoskin').ObjectID

switchService.getRooms = function(req, res) {
    var db = req.db;
    db.collection('room').find().toArray(function(err, result) {
        if (err) throw err;
        res.json({
            "rooms": docs
        });
    });
}

switchService.addSwitch = function(db,roomId, switchName,callback) {

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
    });
}

module.exports = switchService;
