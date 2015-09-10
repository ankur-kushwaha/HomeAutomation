var express = require('express');
var router = express.Router();

var Gpio = require('onoff').Gpio;
var file="data/rooms.json";
var jsonfile=require('jsonfile');

var Gpios={};

jsonfile.readFile(file,function(err,obj){
	for(var i in obj.allGpios){
		Gpios[i] = new Gpio(obj.allGpios[i], 'out')
	}
})

button.watch(function(err, value) {
led.writeSync(value);
});


/* GET users listing. */
router.post('/', function(req, res, next) {
	var gpio=req.body.gpio;
	var state=req.body.state;
	Gpios[gpio].writeSync(state);
	res.send(Gpios[gpio].readSync())
});

router.get('/', function(req, res, next) {
	var gpio=req.body.gpio;
	//var state=req.body.state;
	//Gpios[gpio].writeSync(state);
	res.send(Gpios[gpio].readSync());
});


function exit() {
	/*for (var i in gpioPin){
	   //gpios[i].unexport();	
	}*/
	  
	  process.exit();
	}

process.on('SIGINT', exit);

module.exports = router;
