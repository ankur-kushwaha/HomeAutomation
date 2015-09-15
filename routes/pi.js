var express = require('express');
var router = express.Router();

var Gpio = require('onoff').Gpio;
var file="data/rooms.json";
var jsonfile=require('jsonfile');

var Gpios={};


/* GET users listing. */
router.post('/:gpio/:state', function(req, res, next) {
	var gpio=req.params.gpio;
	var state=req.params.state;
	if(Gpios[gpio]==null){
		console.log("Registering gpio "+gpio);
		Gpios[gpio] = new Gpio(gpio, 'out');
	}	
	console.log("writing gpio %s with state %s",gpio,state);
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
	if(Gpios[gpio]==null){
		console.log("Registering gpio "+gpio);
		Gpios[gpio] = new Gpio(gpio, 'out');
	}
	var state=Gpios[gpio].readSync();
	console.log("Reading gpio "+ gpio+"; state : "+state)
	var obj={
		gpio:gpio,
		state:state
	}
	res.json(obj);
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
