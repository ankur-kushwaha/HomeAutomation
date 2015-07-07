'use strict';

angular.module('myApp.home', ['ngRoute', 'myApp.home.service'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home/:id', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', ['$scope', '$routeParams', 'homeService', '$modal',
    function($scope, $routeParams, homeService, $modal) {

$scope.switches=[];
        homeService.getRooms().then(function(res) {
            $scope.rooms = res.data.rooms;
            for(var i in $scope.rooms){
                var room=$scope.rooms[i];
                for(var j in room['switch']){
                $scope.switches.push({roomId:room._id,'name':room['switch'][j]['name']});    
                }
            $scope.roomSelected=$scope.rooms[0];                
            }
        });
        
        $scope.getSwitches = function(room) {
            $scope.roomSelected=room;
            
        }

        $scope.openNewRoomModal = function() {
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'partials/new-room-modal.html',
                controller: 'ModalInstanceCtrl',
                resolve:{
                    room:null
                }
            });

            modalInstance.result.then(function(modal) {
                homeService.addRoom(modal.roomName).then(function(res) {
                    $scope.rooms.push(res.data[0]);
                })
            }, function() {

            });
        }

        $scope.openNewSwitchModal = function() {
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'partials/new-switch-modal.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    room: function() {
                        return $scope.roomSelected;
                    }
                }
            });

            modalInstance.result.then(function(modal) {

                homeService.addSwitch(modal.room._id,modal.switchName).then(function(res) {
                    console.log(res);
                    $scope.switches.push({roomId:modal.room._id,'name':modal.switchName});
                })
            }, function() {

            });
        }
    }
])

.controller('ModalInstanceCtrl', ['$scope', '$modalInstance','room', function($scope, $modalInstance,room) {
    $scope.modal={};
    if(room)
        $scope.modal.room=room;
    $scope.ok = function() {
        $modalInstance.close($scope.modal);
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);
