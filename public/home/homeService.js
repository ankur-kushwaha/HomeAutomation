'use strict';

angular.module('myApp.home.service', [])

.service('homeService', ['$location', '$q', '$http', function($location, $q, $http) {

    var roomsData = [];
    var roomIdCounter = 1;

    var switches = [];
    var switchCounter = 1;
    this.getRooms = function() {
        return $http.get("rooms");
    }

    this.addSwitch=function(roomId,switchName){
        console.log(roomId+" "+switchName);
        return $http.post("switches",{roomId:roomId,switchName:switchName});
    }

    this.addRoom = function(roomName) {
       return $http.post("rooms",{"name":roomName});
    }
}]);