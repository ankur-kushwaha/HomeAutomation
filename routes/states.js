var express = require('express');
var router = express.Router();

var jsonfile=require('jsonfile');
var file=__dirname+"/../data/rooms.json";

//get states
router.get('/', function(req, res, next) {
	console.log("inside get states")
    res.json(jsonfile.readFileSync(file));
});

router.post('/', function(req, res, next) {
	console.log("updating state")
	var state=req.body;
     jsonfile.writeFile(file, state, {spaces: 2}, function(err) {
            if(err)console.error(err);
            res.json(state);
     })
});

module.exports = router;
