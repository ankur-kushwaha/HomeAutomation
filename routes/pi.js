var express = require('express');
var router = express.Router();

var Gpio = require('onoff').Gpio;
var file="data/rooms.json";
var jsonfile=require('jsonfile');

var Gpios={};

jsonfile.readFile(file,function(err,obj){
	for(var i in obj.allGpios){
		Gpios[obj.allGpios[i]] = new Gpio(obj.allGpios[i], 'out')
	}
});


/* GET users listing. */
router.post('/:gpio/:state', function(req, res, next) {
	var gpio=req.params.gpio;
	var state=req.params.state;	
	Gpios[gpio].writeSync(Number(state));
	var obj={
		gpio:gpio,
		state:Gpios[gpio].readSync()
	}
	res.json(obj);
});

router.get('/:gpio', function(req, res, next) {
	var gpio=req.params.gpio;
	//var state=req.body.state;
	//Gpios[gpio].writeSync(state);
	console.log("gpio "+ gpio+" : "+Gpios[gpio].readSync())
	res.json(Gpios[gpio]);
});


function exit() {
	console.log("unexporting all gpios");
	for (var i in Gpios){
	   Gpios[i].unexport();	
	}
	  
	  process.exit();
	}

process.on('SIGINT', exit);

module.exports = router;
