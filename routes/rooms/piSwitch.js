//var Gpio = require('onoff').Gpio;
var RoomModel = require("./RoomModel");
var piSwitch={};
var availableGpio=[17,18,27,22,23,24];

piSwitch.setSwitchState=function(switchId,state){
	console.log("setting switch "+switchId+" to state "+state);
}

piSwitch.setup=function(){
  console.log("Setting pi switch");
	RoomModel.find(function(err, rooms) {
        if (err) return console.error(err);
        for(var i in rooms){
        	var switches=rooms[i].switches;
          console.log(switches.length);
        	for(var j=0;j<switches.length;j++){
            var p=availableGpio.pop();
            console.log(j+":"+p) ;
          }
        }
        console.log(availableGpio);
    });
  
}

piSwitch.registerSwitch=function(){
  var gpio=availableGpio.pop();
  console.log("Register switch with GPIO: "+gpio);
  //gpios[gpio]=new Gpio(gpio,'out');
  gpios[gpio]=gpio;
  console.log(gpios);
  return gpio;
}

piSwitch.unRegisterSwitch=function(gpio){
  availableGpio.push(gpio);
}


function exit() {
/*for (var i in gpioPin){
   //gpios[i].unexport();	
}*/
  
  process.exit();
}

process.on('SIGINT', exit);

module.exports=piSwitch;