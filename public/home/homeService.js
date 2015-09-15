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

    this.toggleSwitch=function(gpio,state){
    	return $http.post('pi/'+gpio+'/'+state);
    }

    this.getSwitchState=function(gpio){
        return $http.get("pi/"+gpio);
    }


}]);
