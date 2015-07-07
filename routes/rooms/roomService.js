var roomService = {};

roomService.getRooms = function(db,callback) {
    db.collection('room').find().toArray(function(err, result) {
        if (err) throw err;
        callback(result);
    });
}

roomService.addRoom = function(req,res) { 
  var db=req.db;
    db.collection('room').insert(req.body, function(err, result) {
    if (err) throw err;
    if (result) console.log('Added!');
    res.json(result);
});
}

module.exports = roomService;
