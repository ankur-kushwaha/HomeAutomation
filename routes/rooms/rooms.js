var express = require('express');
var router = express.Router();

var jsonfile=require('jsonfile');

var piSwitch=require('./piSwitch');
var file="data/rooms.json";

//piSwitch.setup();

//to get all rooms
router.get('/', function(req, res, next) {
    console.log("inside get rooms")
    res.json({
            "rooms": jsonfile.readFileSync(file).rooms
        });
});


//for adding new room
router.post('/', function(req, res, next) {
    console.log("inside post rooms")
    jsonfile.readFile(file, function(err, obj) {
    var room=req.body;
    room.id=obj.rooms.length;
    room.switches=[];
        obj.rooms.push(room);
        console.dir(obj);
        jsonfile.writeFile(file, obj, {spaces: 2}, function(err) {
            console.error(err)
            res.json(room);
        })
    })
});

//for adding new switch
router.post('/switches',function(req,res){
    console.log("Adding new Switch");
    var roomId=req.body.roomId;
    var _switch = req.body.switch;

     jsonfile.readFile(file, function(err, obj) {
        var gpio=obj.gpios.pop();
        _switch.gpio=gpio,
        _switch.id=obj.rooms[roomId].switches.length;

        obj.rooms[roomId].switches.push(_switch);
        jsonfile.writeFile(file, obj, {spaces: 2}, function(err) {
            console.error(err)
            res.json(_switch);
        });
     });
})

module.exports = router;
