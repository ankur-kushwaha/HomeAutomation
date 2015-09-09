var express = require('express');
var router = express.Router();
var piSwitch = require("./piSwitch");

router.get('/:switchId/:state', function(req, res, next) {
    console.log("SwitchId: "+req.params.switchId);
    console.log("State: "+req.params.state);
    var switchId = req.params.switchId;
    var state = req.params.state;
	if(state=='0'||state=='1'){
		piSwitch.setSwitch(switchId,state);
	}
    res.json({
        switchId: switchId,
        state: 1
    });
});


router.post('/', function(req, res, next) {

});

module.exports = router;
