'use strict';

angular.module('myApp.home.service', [])

.service('homeService', ['$location', '$q', '$http', function($location, $q, $http) {

    var roomsData = [];
    var roomIdCounter = 1;

    var switches = [];
    var switchCounter = 1;
    this.getState = function() {
        return $http.get("state");
    }
    this.setState=function(state){
    	return $http.post("state",state);
    }

    this.addSwitch=function(_switch){
        console.log(_switch);
        return $http.post("rooms/switches",_switch);
    }

    this.addRoom = function(room) {
       return $http.post("rooms",room);
    }

    this.delSwitch=function(switchDetails){
        return $http.delete("rooms/switches",switchDetails);
    }

    this.toggleSwitch=function(switchId,state){
    	$http.get('switches/'+switchId+'/'+state);
    }
}]);
