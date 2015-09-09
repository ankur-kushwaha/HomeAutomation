'use strict';

angular.module('myApp.home', [ 'ngRoute', 'myApp.home.service' ])

.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/home/:id', {
		templateUrl : 'home/home.html',
		controller : 'HomeCtrl'
	});
} ])

.controller('HomeCtrl', [ '$scope', '$routeParams', 'homeService', '$modal', function($scope, $routeParams, homeService, $modal) {

	$scope.toggleSwitch = homeService.toggleSwitch;

	var state = {};

	homeService.getState().then(function(res) {
		state = res.data;
		$scope.rooms = res.data.rooms;
		$scope.gpios = res.data.gpios;
		$scope.roomSelected = 0;
	});

	$scope.getSwitches = function(index) {
		$scope.roomSelected = index;
	}

	$scope.openNewRoomModal = function() {
		var modalInstance = $modal.open({
			animation : $scope.animationsEnabled,
			templateUrl : 'partials/new-room-modal.html',
			controller : 'NewRoomModalCtrl',
			resolve : {
				room : null
			}
		});

		modalInstance.result.then(function(modal) {
			var room = {
				name : modal.roomName,
				id : state.rooms.length,
				switches : []
			}
			state.rooms.push(room);

			homeService.setState(state).then(function(res) {
				$scope.rooms = state.rooms;
			}, function(res) {
				console.log(res);
			})

		}, function(res) {
			console.log(res);
		});
	}

	$scope.openNewSwitchModal = function() {
		var modalInstance = $modal.open({
			animation : $scope.animationsEnabled,
			templateUrl : 'partials/new-switch-modal.html',
			controller : 'ModalInstanceCtrl',
			resolve : {
				room : function() {
					return $scope.rooms[$scope.roomSelected];
				},
				gpios : function() {
					return $scope.gpios;
				}
			}
		});

		modalInstance.result.then(function(modal) {

			var roomId = modal.room.id;

			var _switch = {
				name : modal.switchName,
				gpio : modal.gpio,
				id : state.rooms[roomId].switches.length
			}
			
			for(var i in state.gpios){
			    if(state.gpios[i]==modal.gpio){
			    	state.gpios.splice(i,1);
			        break;
			        }
			}
			
			state.rooms[roomId].switches.push(_switch);

			homeService.setState(state).then(function(res) {
				$scope.rooms = state.rooms;
				$scope.gpios = state.gpios;
			}, function(res) {
				console.log(res);
			})
		}, function() {

		});
	}

	$scope.openGpioDiagram = function() {
		var modalInstance = $modal.open({
			animation : $scope.animationsEnabled,
			templateUrl : 'partials/gpio.html'
		});
	}

	$scope.delSwitch = function(_switch) {
		var switchDetails = {
			roomId : $scope.roomSelected,
			switchId : _switch.id
		}
		homeService.delSwitch(switchDetails).then(function(res) {

			console.log(res.data);
		})
	}

} ])

.controller('NewRoomModalCtrl', [ '$scope', '$modalInstance', 'room', function($scope, $modalInstance, room) {
	$scope.modal = {};
	if (room)
		$scope.modal.room = room;
	$scope.ok = function() {
		$modalInstance.close($scope.modal);
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
} ])

.controller('ModalInstanceCtrl', [ '$scope', '$modalInstance', 'room', 'gpios', function($scope, $modalInstance, room, gpios) {
	$scope.modal = {};
	$scope.gpios = gpios;
	if (room)
		$scope.modal.room = room;
	$scope.ok = function() {
		$modalInstance.close($scope.modal);
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
} ]);
